CREATE TABLE
    club_emails (
        id SERIAL PRIMARY KEY,
        club_id SERIAL REFERENCES clubs (id),
        email VARCHAR(64) NOT NULL
    );