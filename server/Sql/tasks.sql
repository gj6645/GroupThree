DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    Tasks_id INT NOT NULL PRIMARY KEY,
    tasks_description VARCHAR(255) NOT NULL,
    tasks_priority INT DEFAULT NULL,
    tasks_status VARCHAR(25) DEFAULT NULL,
    tasks_categories INT DEFAULT NULL,
    tasks_due_date VARCHAR(10) NOT NULL,
    FOREIGN KEY (tasks_categories) REFERENCES categories(categories_id) ON DELETE CASCADE ON UPDATE CASCADE

);