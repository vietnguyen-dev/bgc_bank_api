CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        username VARCHAR(64) NOT NULL UNIQUE,
        "password" VARCHAR(64) NOT NULL,
        user_role_id SERIAL NOT NULL REFERENCES user_roles (id),
        club_id SERIAL NOT NULL REFERENCES clubs (id),
        club_email_id SERIAL NOT NULL REFERENCES club_emails (id),
        --6 digit code
        pw_reset_code VARCHAR(8) NULL,
        pw_reset_expire TIMESTAMP
        WITH
            TIME ZONE NULL,
            date_created DATE NOT NULL DEFAULT NOW(),
            date_updated DATE NULL,
            date_deleted DATE NULL
    );

-- creating an index on a field can lead to faster lookup time

-- instead of looking throughout entire table, you just look specfified field

-- went from 1.4 seconds creating user to .315 seconds

CREATE INDEX club_email_idx ON users(club_email);