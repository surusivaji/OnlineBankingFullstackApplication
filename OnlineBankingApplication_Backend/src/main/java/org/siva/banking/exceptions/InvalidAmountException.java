package org.siva.banking.exceptions;

public class InvalidAmountException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public InvalidAmountException(String str) {
		super(str);
	}

}
