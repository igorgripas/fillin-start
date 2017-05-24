DELETE FROM users WHERE user_id != 0;
ALTER SEQUENCE users_user_id_seq RESTART WITH 1000;
