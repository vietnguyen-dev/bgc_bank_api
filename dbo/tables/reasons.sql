DROP TABLE reasons;

CREATE TABLE
    reasons (
        id SERIAL PRIMARY KEY,
        reason VARCHAR(128),
        club_member_id SERIAL REFERENCES club_members (id),
        amount_given SMALLINT CHECK (amount_given <= 20),
        new_total SMALLINT CHECK (
            amount_given >= 0
            and amount_given <= 1000
        ),
        date_created DATE NOT NULL DEFAULT NOW()
    );