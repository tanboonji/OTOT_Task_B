DROP TABLE IF EXISTS Customer CASCADE;

CREATE TABLE Customer (
    id INTEGER PRIMARY KEY,
    email VARCHAR NOT NULL,
    name VARCHAR NOT NULL
);

INSERT INTO Customer (id, email, name) VALUES (2, 'boonji@gmail.com', 'Boon Ji');
INSERT INTO Customer (id, email, name) VALUES (1, 'peterparker@gmail.com', 'Peter Parker');
INSERT INTO Customer (id, email, name) VALUES (3, 'tonystark@gmail.com', 'Tony Stark');
