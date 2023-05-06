CREATE TABLE
    api_keys (
        id SERIAL PRIMARY KEY,
        clearance VARCHAR(32) NOT NULL,
        "key" VARCHAR(64) NOT NULL
    )