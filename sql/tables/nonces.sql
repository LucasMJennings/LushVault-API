CREATE TABLE main.nonces (
    token_id serial NOT NULL PRIMARY KEY,
    nonce varchar(128) NOT NULL
);