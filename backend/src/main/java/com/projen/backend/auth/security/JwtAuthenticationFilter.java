package com.projen.backend.auth.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.projen.backend.auth.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

            System.out.println("Processing http request");


            try {
                String jwt = getJwtFromRequest(request);

                if(StringUtils.hasText(jwt)){

                    String username = jwtTokenProvider.getUsernameFromToken(jwt);
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                    
                    if(jwtTokenProvider.validateToken(jwt, userDetails)){

                            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                            SecurityContextHolder.getContext().setAuthentication(authentication);

                            




                    }


                    
                }





                } catch (Exception ex) {

                        logger.error("Impossibile impostare l'autenticazione utente", ex);

                }
             


                try {
                    filterChain.doFilter(request, response);
                } catch (Exception ex) {
                    logger.error("Error during filter chain execution", ex);
                    throw ex; // Rethrow to ensure proper error handling upstream
                }
            }
            
     private String getJwtFromRequest(HttpServletRequest request) {


            String bearerToken = request.getHeader("Authorization");
            if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
                return bearerToken.substring(7);

            }


            return null;
    
        }


}
