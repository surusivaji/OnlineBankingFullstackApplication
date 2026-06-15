package org.siva.banking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="accounts")
public class Account {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="account_number")
	private Long accountNumber;
	
	@Column(name="account_holder_name", nullable=false, length=50)
	private String accountHolderName;
	
	@Column(name="email", nullable=false, length=50, unique=true)
	private String email;
	
	@Column(name="mobile_number", nullable=false, length=10, unique=true)
	private String mobileNumber;
	
	@Column(name="account_balance", nullable=false)
	private Double accountBalance;
	

}
