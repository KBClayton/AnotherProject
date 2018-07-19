DROP DATABASE IF EXISTS jobs_db;
CREATE DATABASE jobs_db;
USE jobs_db;

create table user_info (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL,
	email_address VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	state VARCHAR(20) NOT NULL,
	country VARCHAR(100) NOT NULL,
	job_type VARCHAR(100) NULL,
	salary_min INT (255) NULL,
	PRIMARY KEY(id)
);

CREATE TABLE saved_jobs_table (
	id INT NOT NULL AUTO_INCREMENT,
	company VARCHAR(100) NULL,
	contact_name VARCHAR (100) NULL,
	contact_phone INT(10) NULL,
	application_link INT (10) NULL,
	position VARCHAR (100) NULL,
	job_location VARCHAR (100) NULL,
	remote_available BOOLEAN,
	confidence_level INT (10) NULL,
	notes_to_self VARCHAR (1000) NULL,
	desired_annual_salary INT (255) NULL,
	desired_hourly_salary INT (255) NULL,
	posted_annual_salary INT (255) NULL,
	posted_hourly_salary INT (255) NULL,
	PRIMARY KEY (id)
);

CREATE TABLE comments(
	id INT NOT NULL AUTO_INCREMENT,
	comments VARCHAR (1000),
	PRIMARY KEY (id);
)


SELECT * FROM user_info;

SELECT * FROM saved_jobs_table;
