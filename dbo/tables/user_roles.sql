CREATE TABLE
    user_roles(
        id SERIAL PRIMARY KEY,
        code VARCHAR(4) NOT NULL,
        role VARCHAR(32) NOT NULL
    );

SELECT * FROM user_roles;