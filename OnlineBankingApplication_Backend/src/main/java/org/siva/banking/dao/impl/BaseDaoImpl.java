package org.siva.banking.dao.impl;

import org.siva.banking.dao.BaseDao;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;

@Repository
public class BaseDaoImpl implements BaseDao {
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public <T> T save(T entity) {
		return entityManager.merge(entity);
	}

	@Override
	public <T> T find(Class<T> entityClass, Object primaryKey) {
		return entityManager.find(entityClass, primaryKey);
	}

	@Override
	public void delete(Object object) {
		entityManager.remove(object);
	}

	@Override
	public CriteriaBuilder getCriteriaBuilder() {
		return entityManager.getCriteriaBuilder();
	}

	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}

}
