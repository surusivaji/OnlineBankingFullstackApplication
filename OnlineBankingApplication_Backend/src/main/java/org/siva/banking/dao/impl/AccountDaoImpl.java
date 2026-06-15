package org.siva.banking.dao.impl;

import java.util.List;

import org.siva.banking.dao.AccountDao;
import org.siva.banking.entity.Account;
import org.springframework.stereotype.Repository;

import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

@Repository
public class AccountDaoImpl extends BaseDaoImpl implements AccountDao {

	@Override
	public List<Account> findAllAccounts() {
		CriteriaBuilder criteriaBuilder = getCriteriaBuilder();
		CriteriaQuery<Account> criteriaQuery = criteriaBuilder.createQuery(Account.class);
		Root<Account> root = criteriaQuery.from(Account.class);
		criteriaQuery.select(root).orderBy(criteriaBuilder.asc(root.get("accountNumber")));
		TypedQuery<Account> typedQuery = getEntityManager().createQuery(criteriaQuery);
		return typedQuery.getResultList();
	}

}
