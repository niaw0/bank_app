DROP TABLE IF EXISTS accounts, customers;
DROP DATABASE IF EXISTS bank_vault; --COMMENT OUT IF IN PRODUCTION
DROP ROLE IF EXISTS bank_master; -- also this
CREATE ROLE bank_master;
CREATE DATABASE bank_vault;


CREATE TABLE customers(
    id VARCHAR(36) PRIMARY KEY
    name VARCHAR(60) NOT NULL
    email VARCHAR(254) NOT NULL
    dob DATE NOT NULL
    password integer NOT NULL
)

CREATE TABLE accounts(
    customer_id integer references customers(id),
    account_type VARCAHR() -- longest is Investment, Saving Current
)