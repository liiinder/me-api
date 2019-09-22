DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "birth" VARCHAR(8),
    "name" VARCHAR(255),
    UNIQUE("email")
);

INSERT INTO users VALUES ("linderkristoffer@hotmail.com", "passwordIShard", "19870428", "Kristoffer Linder");