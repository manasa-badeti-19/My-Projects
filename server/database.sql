CREATE DATABASE masterdatadb

CREATE TABLE departments(
    
    id VARCHAR(20) PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE designations(
    
    id VARCHAR(20) PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE employment_types(
    
   id VARCHAR(20) PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE roles(
    
   id VARCHAR(20) PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE shifts(
    
   id VARCHAR(20) PRIMARY KEY,
    name TEXT NOT NULL
);



CREATE TABLE countries(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE states(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE locations(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);

CREATE TABLE banks(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE gender(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE reporting_managers(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE cities(
    
   id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);


ALTER TABLE designations
ADD COLUMN department_id VARCHAR(20) NOT NULL;

ALTER TABLE designations
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id) 
REFERENCES departments(id)
ON DELETE CASCADE;


ALTER TABLE departments 
ALTER COLUMN id TYPE VARCHAR(20)


//inserting records

INSERT INTO employment_types (id,name)
VALUES
( 'PERM', 'Permanent' ),
('CONT', 'Contract');


INSERT INTO roles (id,name)
VALUES
( 'R01', 'Admin' ),
( 'R02', 'Manager' ),
('R03', 'Employee');


INSERT INTO shifts (id,name)
VALUES
( 'S1', 'Morning' ),
( 'S2', 'Evening' ),
('S3', 'Night');

INSERT INTO countries (id,name)
VALUES
( 'IN', 'India' );

INSERT INTO states (id,name,country_id)
VALUES 
('AP', 'Andhra Pradesh','IN'),
('TS', 'Telangana','IN'),
('KA', 'Karnataka','IN'),
('TN', 'Tamil Nadu','IN'),
('KL', 'Kerela','IN'),
('MH', 'Maharashtra','IN'),
('WB', 'West Bengal','IN');


INSERT INTO locations (id,name)
VALUES 
('LOC1', 'Hyderabad'),
('LOC2', 'Chennai'),
('LOC3', 'Bangalore'),
('LOC4', 'Mumbai'),
('LOC5', 'Kolkata');


INSERT INTO banks (id,name)
VALUES 
('CNB', 'Canara Bank'),
('SBI', 'State Bank of India'),
('HDFC', 'HDFC Bank');

INSERT INTO gender (id,name)
VALUES
('G01','Male'),
('G02','Female');

INSERT INTO reporting_managers (id,name,department_id)
VALUES
('RM01','Sanjay Sahu','D02'),
('RM02','Megha Akash','D01'),
('RM03','Saranya B','D03');

INSERT INTO cities (id,name,state_id)
VALUES
('C01','Hyderabad','TS'),
('C02','Vishakapatanam','AP'),
('C03','Chennai','TN'),
('C04','Kolkata','WB'),
('C05','Mumbai','MH'),
('C06','Vijayawada','AP'),
('C07','Kochi','KL'),
('C08','Bangalore','KA');




ALTER TABLE locations DROP COLUMN state_id;