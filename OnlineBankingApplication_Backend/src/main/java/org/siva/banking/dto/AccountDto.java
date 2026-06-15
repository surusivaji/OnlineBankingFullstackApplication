package org.siva.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AccountDto {
	
	private Long accountNumber;
	
	private String accountHolderName;
	
	private String email;
	
	private String mobileNumber;
	
	private Double accountBalance;

}
