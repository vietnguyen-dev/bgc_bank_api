CREATE TABLE
    club_members (
        id SERIAL PRIMARY KEY,
        user_id SERIAL NOT NULL REFERENCES users (id),
        grade VARCHAR(2) NOT NULL,
        amount SMALLINT NOT NULL DEFAULT 0
    );