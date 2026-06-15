package org.siva.banking.controller;

import java.util.List;

import org.siva.banking.dto.AccountDto;
import org.siva.banking.exceptions.ApiResponse;
import org.siva.banking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/onlineBanking")
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {
	
	@Autowired
	private AccountService accountService;
	
	@PostMapping("/save")
	public ResponseEntity<AccountDto> createAccount(@RequestBody AccountDto accoutDto) {
		AccountDto account = accountService.createAccount(accoutDto);
		return new ResponseEntity<>(account, HttpStatus.CREATED);
	}
	
	@GetMapping("/accounts")
	public ResponseEntity<List<AccountDto>> getAllAccounts() {
		List<AccountDto> accounts = accountService.getAllAccounts();
		return new ResponseEntity<>(accounts, HttpStatus.OK);
	}
	
	@GetMapping("/accounts/{id}")
	public ResponseEntity<AccountDto> getAccountByAccountNumber(@PathVariable("id") Long accountNumber) {
		AccountDto accountDto = accountService.getAccountByAccountNumber(accountNumber);
		return new ResponseEntity<>(accountDto, HttpStatus.OK);
	}
	
	@PutMapping("/updateAccount")
	public ResponseEntity<AccountDto> updateAcccount(@RequestBody AccountDto accountDto) {
		AccountDto updateAccount = accountService.updateAccount(accountDto);
		return new ResponseEntity<>(updateAccount, HttpStatus.OK);
	}
	
	@PatchMapping("/withdraw/{id}")
	public ResponseEntity<AccountDto> withdrawMoney(@PathVariable("id") Long accountNumber, @RequestParam("money") Double withdrawMoney) {
		AccountDto accountDto = accountService.withdrawMoney(accountNumber, withdrawMoney);
		return new ResponseEntity<>(accountDto, HttpStatus.OK);
	}
	
	@PatchMapping("/deposit/{id}")
	public ResponseEntity<AccountDto> depositMoney(@PathVariable("id") Long accountNumber, @RequestParam("money") Double depositMoney) {
		AccountDto accountDto = accountService.depositMoney(accountNumber, depositMoney);
		return new ResponseEntity<>(accountDto, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteAccount/{id}")
	public ResponseEntity<ApiResponse> deleteAccount(@PathVariable("id") Long accountNumber) {
		accountService.deleteAccount(accountNumber);
		return new ResponseEntity<>(new ApiResponse(true, "Account information deleted successfully"), HttpStatus.OK);
	}

}
