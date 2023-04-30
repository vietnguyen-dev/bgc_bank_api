CREATE TABLE
    reasons (
        id SERIAL PRIMARY KEY,
        reason_lookup_id SERIAL NOT NULL REFERENCES reasons_lookup (id),
        details VARCHAR(256) NOT NULL,
        club_member_id SERIAL NOT NULL REFERENCES club_members (id),
        user_id SERIAL NOT NULL REFERENCES users (id),
        given SMALLINT NOT NULL,
        current_total SMALLINT NOT NULL
    );