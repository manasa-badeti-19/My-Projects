CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) UNIQUE NOT NULL, 
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender_id VARCHAR REFERENCES gender(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(15) UNIQUE NOT NULL,
    department_id VARCHAR REFERENCES departments(id),
    designation_id VARCHAR REFERENCES designations(id),
    employment_id VARCHAR REFERENCES employment_types(id),
    joining_date DATE NOT NULL,
    work_location_id VARCHAR REFERENCES locations(id),
    shift_id VARCHAR REFERENCES shifts(id),
    role_id VARCHAR REFERENCES roles(id),
    manager_id VARCHAR REFERENCES reporting_managers(id),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city_id VARCHAR REFERENCES cities(id),
    state_id VARCHAR REFERENCES states(id),
    country_id VARCHAR REFERENCES countries(id),
    pincode VARCHAR(6) NOT NULL CHECK (pincode ~'^[0-9]{6}$'),
    aadhaar CHAR(12) UNIQUE NOT NULL CHECK (aadhaar ~ '^[0-9]{12}$'),
    pan CHAR(10) UNIQUE NOT NULL CHECK (pan ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
    ifsc VARCHAR(11) NOT NULL,
    bank_id VARCHAR REFERENCES banks(id),
    account_no VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_employee_aadhaar UNIQUE (aadhaar),
    CONSTRAINT uq_ifsc_account UNIQUE (ifsc,account_no)
   
);



ALTER TABLE employees
ALTER COLUMN pan TYPE CHAR(15);

ALTER TABLE employees
ALTER COLUMN ifsc TYPE VARCHAR(20);

ALTER TABLE employees
ALTER COLUMN aadhaar TYPE VARCHAR(12);

ALTER TABLE employees
ALTER COLUMN pan TYPE VARCHAR(15);

ALTER TABLE employees
ALTER COLUMN pincode TYPE VARCHAR(6);

CREATE OR REPLACE FUNCTION generate_employee_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.employee_id := 'E' || (NEW.id+100);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_employee_id
BEFORE INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION generate_employee_id();

SELECT conname
FROM pg_constraint
WHERE conrelid ='employees'::regclass;

ALTER TABLE employees
DROP CONSTRAINT  employees_aadhaar_check;

 employees_pincode_check

 employees_pan_check