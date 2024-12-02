DROP TABLE IF EXISTS favorite_movies, user_groups, users, groups CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255) NOT NULL
);  

CREATE TABLE favorite_movies (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_groups (
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

INSERT INTO groups (group_name) VALUES ('Group 1'), ('Group 2'), ('Group 3');

INSERT INTO users (email, username, first_name, last_name, password)
VALUES 
('user1@example.com', 'user1', 'First1', 'Last1', 'password1'),
('user2@example.com', 'user2', 'First2', 'Last2', 'password2'),
('user3@example.com', 'user3', 'First3', 'Last3', 'password3'),
('user4@example.com', 'user4', 'First4', 'Last4', 'password4'),
('user5@example.com', 'user5', 'First5', 'Last5', 'password5'),
('user6@example.com', 'user6', 'First6', 'Last6', 'password6');

INSERT INTO user_groups (user_id, group_id) VALUES
(1, 1), (2, 1), (3, 1),
(4, 2), (5, 2), (6, 2), 
(1, 3), (2, 3), (3, 3); 