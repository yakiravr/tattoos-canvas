DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS resetPass;
DROP TABLE IF EXISTS cards CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL CHECK ( firstname <> ''),
    lastname VARCHAR NOT NULL CHECK ( lastname <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    imgUrl TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resetPass  (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR NOT NULL CHECK (email <> ''),
    code VARCHAR NOT NULL CHECK (code <> ''),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




