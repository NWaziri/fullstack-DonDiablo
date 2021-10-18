INSERT into users (username, password, email, enabled)
values ('nang', '$2a$10$.BzdLWwqLaVf225/E9JPCe/uIkDL4ZFJmBOR56Km6J7FYqIeWMZf6', 'test1@gmail.com', TRUE),
       ('admin', '$2a$10$.BzdLWwqLaVf225/E9JPCe/uIkDL4ZFJmBOR56Km6J7FYqIeWMZf6','test1@hotmail.com',  TRUE);

INSERT into authorities (username, authority)
values  ('nang', 'ROLE_USER'),
        ('admin', 'ROLE_ADMIN');