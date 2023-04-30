CREATE TABLE
    clubs (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8),
        name VARCHAR(256),
        city VARCHAR(32),
        state VARCHAR(2),
        zip INT CHECK (
            zip BETWEEN 00001 AND 99999
        )
    );

INSERT INTO
    clubs (code, name, city, state, zip)
VALUES (
        'waelswwa',
        'Boys & Girls Clubs of Southwest Washington - Washington Club',
        'vancouver',
        'wa',
        98663
    );