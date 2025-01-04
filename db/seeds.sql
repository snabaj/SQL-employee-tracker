INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('HR');
    
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 80000, 2),
       ('Sales Lead', 60000, 3),
       ('HR Manager', 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Johnson', 1, NULL),
       ('Jane', 'Briggs', 2, NULL),
       ('Alice', 'Hammer', 3, NULL);
       
