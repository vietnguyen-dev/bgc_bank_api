CREATE TABLE
    api_keys (
        id SERIAL PRIMARY KEY,
        clearance VARCHAR(32),
        "key" VARCHAR(64)
    )