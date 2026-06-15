package org.siva.banking.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;

public interface BaseDao {
	
	 <T> T save(T entity);
	 
	 <T> T find(Class<T> entityClass, Object primaryKey);
	 
	 void delete(Object object);
	 
	 CriteriaBuilder getCriteriaBuilder();
	 
	 EntityManager getEntityManager();

}
