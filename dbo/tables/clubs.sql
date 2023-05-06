CREATE TABLE
    clubs (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8),
        name VARCHAR(128),
        city VARCHAR(32),
        state VARCHAR(2),
        region VARCHAR(128)
    );