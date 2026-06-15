package org.siva.banking.service;

import java.util.List;

import org.siva.banking.dto.AccountDto;

public interface AccountService {
	
	AccountDto createAccount(AccountDto accountDto);
	
	List<AccountDto> getAllAccounts();
	
	AccountDto getAccountByAccountNumber(Long accountNumber);
	
	AccountDto updateAccount(AccountDto accountDto);
	
	AccountDto withdrawMoney(Long accountNumber, Double money);
	
	AccountDto depositMoney(Long accountNumber, Double money);
	
	void deleteAccount(Long accountNumber);

}
