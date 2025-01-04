//import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
await connectToDb();
const dbQueries = {
    getDepartments: async () => {
        const res = await pool.query('SELECT * FROM department');
        return res.rows;
    },
    getRoles: async () => {
        const res = await pool.query('SELECT * FROM role');
        return res.rows;
    },
    getEmployees: async () => {
        const res = await pool.query('SELECT * FROM employee');
        return res.rows;
    },
    addDepartment: async (name) => {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    },
    addRole: async (title, salary, departmentId) => {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    },
    addEmployee: async (firstName, lastName, roleId, managerId) => {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    },
    updateEmployeeRole: async (employeeId, roleId) => {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    },
    updateEmployeeManager: async (employeeId, managerId) => {
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
    },
    viewEmployeesByManager: async (managerId) => {
        const res = await pool.query('SELECT * FROM employee WHERE manager_id = $1', [managerId]);
        return res.rows;
    },
    viewEmployeesByDepartment: async (departmentId) => {
        const res = await pool.query(`SELECT e.* FROM employee e 
         JOIN role r ON e.role_id = r.id 
         WHERE r.department_id = $1`, [departmentId]);
        return res.rows;
    },
    deleteEmployee: async (id) => {
        await pool.query('DELETE FROM employee WHERE id = $1', [id]);
    },
    getDepartmentBudget: async (departmentId) => {
        const res = await pool.query(`SELECT SUM(r.salary) AS total_budget 
         FROM employee e 
         JOIN role r ON e.role_id = r.id 
         WHERE r.department_id = $1`, [departmentId]);
        return res.rows[0].total_budget;
    },
};
export default dbQueries;
