CREATE TABLE
    user_roles(
        id SERIAL PRIMARY KEY,
        code VARCHAR(4),
        role VARCHAR(32)
    );

INSERT INTO
    users_roles (code, user_role)
VALUES ('clmb', 'club member');

INSERT INTO
    users_roles (code, user_role)
VALUES ('staff', 'staff');

SELECT * FROM user_roles;