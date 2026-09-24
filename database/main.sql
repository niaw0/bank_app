

DROP TABLE IF EXISTS accounts, customers, cards, transactions;

CREATE TABLE customers
    (
        id            BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY  ,
        name          VARCHAR(60) NOT NULL        ,
        email         VARCHAR(254) NOT NULL UNIQUE,
        dob           DATE NOT NULL               ,
        password_hash VARCHAR(255) NOT NULL,
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE accounts
    (
        customer_id     BIGINT references customers(id),
        account_number  BIGINT PRIMARY KEY                  ,
        account_type    VARCHAR(30)                         ,
        account_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


    CREATE TABLE cards (
        card_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        customer BIGINT references accounts(customer_id),
        card_number VARCHAR(19) NOT NULL,
        cvv VARCHAR(3) NOT NULL,
        transact_id BIGINT, -- id for user transactions
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


    CREATE TABLE transactions(
        transaction_identifier BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        transaction_id BIGINT references cards(transact_id),
        customer_id BIGINT references customers(id),
        transaction_type VARCHAR(100),
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    