package org.siva.banking.mapper;

import org.siva.banking.dto.AccountDto;
import org.siva.banking.entity.Account;

public class AccountMapper {
	
	public static AccountDto convertToAccountDto(Account account) {
		AccountDto accountDto = new AccountDto();
		accountDto.setAccountNumber(account.getAccountNumber());
		accountDto.setAccountHolderName(account.getAccountHolderName());
		accountDto.setEmail(account.getEmail());
		accountDto.setMobileNumber(account.getMobileNumber());
		accountDto.setAccountBalance(account.getAccountBalance());
		return accountDto;
	}
	
	public static Account convertToAccount(AccountDto accountDto) {
		Account account = new Account();
		account.setAccountNumber(account.getAccountNumber());
		account.setAccountHolderName(accountDto.getAccountHolderName());
		account.setEmail(accountDto.getEmail());
		account.setMobileNumber(accountDto.getMobileNumber());
		account.setAccountBalance(accountDto.getAccountBalance());
		return account;
	}

}
