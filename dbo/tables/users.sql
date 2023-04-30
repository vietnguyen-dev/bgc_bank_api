CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        username VARCHAR(64) NOT NULL UNIQUE,
        email VARCHAR(64) NOT NULL UNIQUE,
        "password" VARCHAR(64) NOT NULL,
        user_role_id SERIAL NOT NULL REFERENCES user_roles (id),
        club_id SERIAL NOT NULL REFERENCES clubs (id),
        email_verified BOOLEAN DEFAULT false,
        date_created DATE NOT NULL DEFAULT NOW(),
        date_updated DATE NULL,
        date_deleted DATE NULL
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'John',
        'Doe',
        'johndoe',
        'johndoe@example.com',
        'password123',
        1,
        1
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'Jane',
        'Doe',
        'janedoe',
        'janedoe@example.com',
        'password456',
        2,
        2,
        true
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'Bob',
        'Smith',
        'bobsmith',
        'bobsmith@example.com',
        'password789',
        1,
        1,
        false
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'Alice',
        'Johnson',
        'alicej',
        'alicej@example.com',
        'password123',
        2,
        2,
        true
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'Michael',
        'Davis',
        'michaeld',
        'michaeld@example.com',
        'password456',
        1,
        1,
        false
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'Emily',
        'Jones',
        'emilyj',
        'emilyj@example.com',
        'password789',
        2,
        2,
        true
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )
VALUES (
        'David',
        'Williams',
        'davidw',
        'davidw@example.com',
        'password123',
        1,
        1,
        true
    );

INSERT INTO
    users (
        first_name,
        last_name,
        username,
        email,
        password,
        user_role_id,
        club_id
    )