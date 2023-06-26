CREATE TABLE
    club_members (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        preferred_name VARCHAR(64) NULL,
        grade VARCHAR(2) NOT NULL,
        amount SMALLINT NOT NULL DEFAULT 0,
        club_id SERIAL REFERENCES clubs (id),
        date_created DATE NOT NULL DEFAULT NOW(),
        date_updated DATE NULL,
        date_deleted DATE NULL
    );