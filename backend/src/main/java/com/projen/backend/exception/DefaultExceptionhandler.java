package com.projen.backend.exception;
        
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;




@ControllerAdvice
public class DefaultExceptionhandler {








        @ExceptionHandler(ValidationException.class)
        public ResponseEntity<ApiError> handleValidationException(ValidationException e , HttpServletRequest request){

            ApiError apiError = new ApiError(
                    request.getRequestURI(),
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST.value(),
                    LocalDateTime.now()

            );

            return  new ResponseEntity<>(apiError,HttpStatus.BAD_REQUEST);
        }







        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ApiError> handleCredentialException(BadCredentialsException e , HttpServletRequest request){
                
            ApiError apiError = new ApiError(
                    request.getRequestURI(),
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED.value(),
                    LocalDateTime.now()

            );

            return  new ResponseEntity<>(apiError,HttpStatus.UNAUTHORIZED);
        }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleInternalException(Exception e , HttpServletRequest request){

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()

        );

        System.out.println("Error Message ["+e.getMessage()+"]");
       // e.printStackTrace();


        return  new ResponseEntity<>(apiError,HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ApiError> handleTaskNotFoundException(TaskNotFoundException e , HttpServletRequest request){

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now()

        );

        return  new ResponseEntity<>(apiError,HttpStatus.NOT_FOUND);}


    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException e , HttpServletRequest request){

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now()

        );

        return  new ResponseEntity<>(apiError,HttpStatus.NOT_FOUND);}

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ApiError> handleUnauthorizedAccessException(UnauthorizedAccessException e , HttpServletRequest request){

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now()

        );

        return  new ResponseEntity<>(apiError,HttpStatus.UNAUTHORIZED);}
}
