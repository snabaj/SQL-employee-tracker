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
    addDepartment: async (name: string) => {
      await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    },
    addRole: async (title: string, salary: number, departmentId: number) => {
      await pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [title, salary, departmentId]
      );
    },
    addEmployee: async (firstName: string, lastName: string, roleId: number, managerId: number) => {
      await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, roleId, managerId]
      );
    },
    updateEmployeeManager: async (employeeId: number, managerId: number) => {
      await pool.query(
        'UPDATE employee SET manager_id = $1 WHERE id = $2',
        [managerId, employeeId]
      );
    },
    viewEmployeesByManager: async (managerId: number) => {
      const res = await pool.query(
        'SELECT * FROM employee WHERE manager_id = $1',
        [managerId]
      );
      return res.rows;
    },
    viewEmployeesByDepartment: async (departmentId: number) => {
      const res = await pool.query(
        `SELECT e.* FROM employee e 
         JOIN role r ON e.role_id = r.id 
         WHERE r.department_id = $1`,
        [departmentId]
      );
      return res.rows;
    },
    deleteDepartment: async (id: number) => {
      await pool.query('DELETE FROM department WHERE id = $1', [id]);
    },
    deleteRole: async (id: number) => {
      await pool.query('DELETE FROM role WHERE id = $1', [id]);
    },
    deleteEmployee: async (id: number) => {
      await pool.query('DELETE FROM employee WHERE id = $1', [id]);
    },
    getDepartmentBudget: async (departmentId: number) => {
      const res = await pool.query(
        `SELECT SUM(r.salary) AS total_budget 
         FROM employee e 
         JOIN role r ON e.role_id = r.id 
         WHERE r.department_id = $1`,
        [departmentId]
      );
      return res.rows[0].total_budget;
    },
  };
  export default dbQueries;



