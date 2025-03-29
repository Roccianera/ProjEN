package com.projen.backend.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projen.backend.auth.dto.AuthResponse;
import com.projen.backend.auth.dto.LoginRequest;
import com.projen.backend.auth.dto.RegisterRequest;
import com.projen.backend.auth.security.JwtTokenProvider;
import com.projen.backend.model.User;
import com.projen.backend.repository.UserRepository;

@Service
public class AuthService {
    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    /**
     * Authenticates a user and generates a JWT token for the session.
     * 
     * @param request The login request containing username and password
     * @return AuthResponse containing the generated JWT token and username
     * @throws BadCredentialsException if authentication fails due to invalid credentials
     * @throws AuthenticationException if authentication fails for any other reason
     */
    public AuthResponse login(LoginRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails =(UserDetails) authentication.getPrincipal();
            String jwt = jwtTokenProvider.generateToken(userDetails);
            return new AuthResponse(jwt, request.getUsername());      


        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password", e);
        } catch (org.springframework.security.core.AuthenticationException e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage(), e);
        }

       

    }

    public AuthResponse register(RegisterRequest   request) {

        //TODO :Refactor this code to use a custom exception class
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already taken ");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken");
        }

        User user = User.builder()
        .username(request.getUsername())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();

        //TODO :ADD ROLE USER BY DEFAULT
        //TODO :ADD USER PROFILE

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserDetails userDetails =(UserDetails) authentication.getPrincipal();
        String jwt = jwtTokenProvider.generateToken(userDetails);

        return new AuthResponse(jwt, request.getUsername());

    }






    
    











}
