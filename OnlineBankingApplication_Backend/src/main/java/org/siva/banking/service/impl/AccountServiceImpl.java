package org.siva.banking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.siva.banking.dao.AccountDao;
import org.siva.banking.dto.AccountDto;
import org.siva.banking.entity.Account;
import org.siva.banking.exceptions.InvalidAmountException;
import org.siva.banking.exceptions.ResourceNotFoundException;
import org.siva.banking.mapper.AccountMapper;
import org.siva.banking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	private AccountDao accountDao;

	@Override
	public AccountDto createAccount(AccountDto accountDto) {
		Account account = AccountMapper.convertToAccount(accountDto);
		Account save = accountDao.save(account);
		return AccountMapper.convertToAccountDto(save);
	}
	
	@Override
	public List<AccountDto> getAllAccounts() {
		List<Account> accounts = accountDao.findAllAccounts();
		List<AccountDto> accountDtos = accounts.stream().map(account -> AccountMapper.convertToAccountDto(account)).collect(Collectors.toList());
		return accountDtos;
	}
	
	@Override
	public AccountDto getAccountByAccountNumber(Long accountNumber) {
		Account account = accountDao.find(Account.class, accountNumber);
		if (account==null) {
			throw new ResourceNotFoundException("Account", "accountNumber", accountNumber);
		}
		return AccountMapper.convertToAccountDto(account);
	}
	
	@Override
	public AccountDto updateAccount(AccountDto accountDto) {
		Account account = accountDao.find(Account.class, accountDto.getAccountNumber());
		if (account==null) {
			throw new ResourceNotFoundException("Account", "accountNumber", accountDto.getAccountNumber());
		}
		account.setAccountHolderName(accountDto.getAccountHolderName());
		account.setEmail(accountDto.getEmail());
		account.setMobileNumber(accountDto.getMobileNumber());
		Account updateAccount = accountDao.save(account);
		return AccountMapper.convertToAccountDto(updateAccount);
	}

	@Override
	public AccountDto withdrawMoney(Long accountNumber, Double money) {
		Account account = accountDao.find(Account.class, accountNumber);
		if (account==null) {
			throw new ResourceNotFoundException("Account", "accountNumber", accountNumber);
		}
		if (money < 0) {
			throw new InvalidAmountException("Insufficient Funds");
		}
		if (account.getAccountBalance() < money) {
			throw new InvalidAmountException("Invalid Amount");
		}
		account.setAccountBalance(account.getAccountBalance()-money);
		Account save = accountDao.save(account);
		return AccountMapper.convertToAccountDto(save);
	}

	@Override
	public AccountDto depositMoney(Long accountNumber, Double money) {
		Account account = accountDao.find(Account.class, accountNumber);
		if (account==null) {
			throw new ResourceNotFoundException("Account", "accountNumber", accountNumber);
		}
		if (money < 0) {
			throw new InvalidAmountException("Invalid Amount");
		}
		account.setAccountBalance(account.getAccountBalance()+money);
		Account save = accountDao.save(account);
		return AccountMapper.convertToAccountDto(save);
	}

	@Override
	public void deleteAccount(Long accountNumber) {
		Account account = accountDao.find(Account.class, accountNumber);
		if (account==null) {
			throw new ResourceNotFoundException("Account", "accountNumber", accountNumber);
		}
		accountDao.delete(account);
	}

}
