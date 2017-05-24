CREATE TABLE users
(
  user_id serial,
  email character varying UNIQUE NOT NULL,
  password_hash character varying(100)  NOT NULL,
  salt character varying(100)  NOT NULL,
  CONSTRAINT users_pk PRIMARY KEY (user_id)
);
