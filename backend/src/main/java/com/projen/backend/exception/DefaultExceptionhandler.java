package com.projen.backend.exception;
        
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;




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




        @ExceptionHandler(NoResourceFoundException.class)
        public ResponseEntity<ApiError> handleNoResourceFoundException(NoResourceFoundException e , HttpServletRequest request){

            ApiError apiError = new ApiError(
                    request.getRequestURI(),
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    LocalDateTime.now()

            );

            return  new ResponseEntity<>(apiError,HttpStatus.NOT_FOUND);
        }


        @ExceptionHandler(ResourceNotFound.class)

        public ResponseEntity<ApiError> handleResourceNotFoundException(ResourceNotFound e , HttpServletRequest request){

            ApiError apiError = new ApiError(
                    request.getRequestURI(),
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    LocalDateTime.now()

            );

            return  new ResponseEntity<>(apiError,HttpStatus.NOT_FOUND);
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

        System.out.println("Error Message ["+e.getMessage()+"]" + "Error Class ["+e.getClass()+"]");
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
