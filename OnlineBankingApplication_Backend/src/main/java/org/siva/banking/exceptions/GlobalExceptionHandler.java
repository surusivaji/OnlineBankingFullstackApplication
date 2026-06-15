package org.siva.banking.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException) {
		String message = resourceNotFoundException.getMessage();
		ApiResponse apiResponse = new ApiResponse(false, message);
		return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(InvalidAmountException.class)
	public ResponseEntity<ApiResponse> handleInvalidAmountException(InvalidAmountException invalidAmountException) {
		String message = invalidAmountException.getMessage();
		ApiResponse apiResponse = new ApiResponse(false, message);
		return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> handleException(Exception exception) {
		String message = exception.getMessage()+" -> "+ exception.toString().getClass().getName();
		ApiResponse apiResponse = new ApiResponse(false, message);
		exception.printStackTrace();
		return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
