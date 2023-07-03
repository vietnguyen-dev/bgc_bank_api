-- Active: 1682658392185@@containers-us-west-3.railway.app@7024@railway

DROP TABLE reasons;

CREATE TABLE
    reasons (
        id SERIAL PRIMARY KEY,
        reason VARCHAR(128),
        club_member_id SERIAL REFERENCES club_members (id),
        amount_given SMALLINT,
        new_total SMALLINT,
        date_created DATE NOT NULL DEFAULT NOW()
    );