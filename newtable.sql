CREATE TABLE site(
    site_id uuid DEFAULT uuid_generate_v4(),
    site_name VARCHAR (50) NOT NULL,
    description VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP NOT NULL
);