DROP TABLE IF EXISTS accounts, customers;

CREATE TABLE customers
    (
        id            BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY    ,
        name          VARCHAR(60) NOT NULL        ,
        email         VARCHAR(254) NOT NULL UNIQUE,
        dob           DATE NOT NULL               ,
        password_hash VARCHAR(255) NOT NULL,
        last_update DATE DEFAULT CURRENT_DATE
    );
CREATE TABLE accounts
    (
        customer_id     BIGINT references customers(id),
        account_number  BIGINT PRIMARY KEY                  ,
        account_type    VARCHAR(18)                         ,-- longest is Investment, Saving Current
        account_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
        last_update DATE DEFAULT CURRENT_DATE
    );



-- 5 test records
INSERT INTO customers (name, email, dob, password_hash)
VALUES
    ('Alice Johnson', 'alice.johnson@example.com', '1988-03-14', '$2b$12$e8w/u4uG8D3m4A1Z7s9XPeKl7H1sV1G2s3D4f5G6h7J8k9L0m1N2O'),
    ('Brian Smith', 'brian.smith@example.com', '1992-11-05', '$2b$12$k9L0m1N2O3P4q5R6s7T8uE8w/u4uG8D3m4A1Z7s9XPeKl7H1sV1G2'),
    ('Clara Martinez', 'clara.m@example.com', '1980-07-22', '$2b$12$Z7s9XPeKl7H1sV1G2s3D4k9L0m1N2O3P4q5R6s7T8uE8w/u4uG8D3'),
    ('David Kim', 'david.kim@example.com', '1995-01-30', '$2b$12$3D4f5G6h7J8k9L0m1N2O3e8w/u4uG8D3m4A1Z7s9XPeKl7H1sV1G2'),
    ('Elena Rostova', 'elena.rostova@example.com', '1984-09-18', '$2b$12$q5R6s7T8uE8w/u4uG8D3mZ7s9XPeKl7H1sV1G2s3D4k9L0m1N2O');

-- I5 test records

INSERT INTO accounts (customer_id, account_number, account_type, account_balance)
VALUES
    (1, 1000000001, 'Current', 4520.50),
    (1, 1000000002, 'Saving', 18500.00),
    (2, 1000000003, 'Investment', 62400.75),
    (3, 1000000004, 'Current', 1250.00),
    (4, 1000000005, 'Saving', 9340.20);
    