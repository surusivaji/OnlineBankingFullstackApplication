package org.siva.banking.dao;

import java.util.List;

import org.siva.banking.entity.Account;

public interface AccountDao extends BaseDao {
	
	List<Account> findAllAccounts();

}
