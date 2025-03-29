package com.projen.backend.auth.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Provider for JWT (JSON Web Token) operations in the authentication system.
 * 
 * This class handles the creation, validation, and parsing of JWT tokens used for authentication.
 * It manages token generation with a configurable validity period, token signing with a secret key,
 * and extracting claims from existing tokens.
 * 
 * The secret key is configured via the application properties with the 'jwt.secret' property.
 * Token validity is set to 1 hour (60*60*1000 milliseconds).
 * 
 * Key functionalities:
 * - Generate JWT tokens for authenticated users
 * - Validate tokens against user details
 * - Extract username and other claims from tokens
 * - Check token expiration
 * 
 * Tokens are signed using HMAC SHA-256 algorithm.
 */
@Component
public class JwtTokenProvider {

    //REFACTOR

    private static final long JWT_TOKEN_VALIDITY = 60 * 60 * 1000;

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
  

        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {


        try {
            return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
                
        } catch (Exception e) {
            // Log the exception or handle it according to your requirements
            System.err.println("Token parsing failed with token: '" + token + "'");
            System.err.println("Error type: " + e.getClass().getName());
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error parsing JWT token: " );
            throw new RuntimeException("Invalid JWT token");
        }
    }
}
