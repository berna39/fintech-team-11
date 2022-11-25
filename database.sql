DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS loan_applications;
DROP TYPE IF EXISTS loan_status;
DROP TABLE IF EXISTS borrowers;	

create table borrowers(
	id SERIAL,
	name VARCHAR(255),
	citizenship VARCHAR(255),
	dob DATE,
	national_id VARCHAR(255),
	address VARCHAR(255),
	job VARCHAR(255),
	username VARCHAR(255),
	password VARCHAR(255),
	PRIMARY KEY(id)
);

create table loan_applications(
	id SERIAL,
	owner_id INTEGER,
	description VARCHAR(255),
	amount DECIMAL,
	interest_rate DECIMAL,
	payback_period INTEGER,
	equated_monthly_installments DECIMAL,
	PRIMARY KEY(id),
	CONSTRAINT fk_owner
      FOREIGN KEY(owner_id) 
	  REFERENCES borrowers(id)
);

CREATE TYPE loan_status AS ENUM ('pending', 'paid');

create table loans(
	id SERIAL,
	loan_application_id INTEGER,
	borrower_id INTEGER,
	date DATE,
	amout_paid DECIMAL,
	status loan_status,
	PRIMARY KEY(id),
	CONSTRAINT fk_loan_application
      FOREIGN KEY(loan_application_id) 
	  REFERENCES loan_applications(id)
);

create table payments(
	id SERIAL,
	loan_id INTEGER,
	date DATE,
	amount DECIMAL,
	PRIMARY KEY(id),
	CONSTRAINT fk_loan
      FOREIGN KEY(loan_id) 
	  REFERENCES loans(id)
);
