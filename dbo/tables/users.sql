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

-- creating an index on a field can lead to faster lookup time

-- instead of looking throughout entire table, you just look specfified field

-- went from 1.4 seconds creating user to .315 seconds

CREATE INDEX users_email_idx ON users(email);