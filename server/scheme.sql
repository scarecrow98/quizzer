CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE quizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	tag VARCHAR(6) NOT NULL UNIQUE,
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,
    type ENUM('text', 'numeric', 'choice') NOT NULL,
    choices JSON NOT NULL DEFAULT (JSON_ARRAY()),
    FOREIGN KEY (quiz_id) REFERENCES quizes(id) ON DELETE CASCADE
);

CREATE TABLE answers (
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, question_id)
);