# Travis PostgreSQL
psql -c 'create database taskb;' -U postgres
psql -c "CREATE USER tanboonji WITH PASSWORD 'password';" -U postgres -d taskb
psql -c "CREATE TABLE Customer (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, email VARCHAR NOT NULL);" -U postgres -d taskb
psql -c "INSERT INTO Customer (id, email, name) VALUES (1, 'boonji@gmail.com', 'Boon Ji');" -U postgres -d taskb
psql -c "INSERT INTO Customer (id, email, name) VALUES (2, 'peterparker@gmail.com', 'Peter Parker');" -U postgres -d taskb
psql -c "INSERT INTO Customer (id, email, name) VALUES (3, 'tonystark@gmail.com', 'Tony Stark');" -U postgres -d taskb

# ElephantSQL
psql -f "init.sql" -h john.db.elephantsql.com -U opnjqxft -d opnjqxft
Password for user opnjqxft: 8iBHn_HbVaww-ayMJnvMrnyK_LuzGek_
