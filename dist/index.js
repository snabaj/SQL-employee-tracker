import inquirer from 'inquirer';
//import { connectToDb } from './connection.js';
import dbQueries from './server.js';
//await connectToDb();
// Define a function that will prompt the user for input
const startApp = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View Employees by Manager',
            'View Employees by Department',
            'Delete Employee',
            'View Department Budget',
            'Exit',
        ],
    });
    switch (answer.action) {
        case 'View All Departments':
            console.table(await dbQueries.getDepartments());
            break;
        case 'View All Roles':
            console.table(await dbQueries.getRoles());
            break;
        case 'View All Employees':
            console.table(await dbQueries.getEmployees());
            break;
        case 'Add Department':
            const deptAnswer = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter department name:',
            });
            await dbQueries.addDepartment(deptAnswer.name);
            console.log('Department added!');
            break;
        case 'Add Role':
            const roleAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter role title:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter role salary:',
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter department ID for the role:',
                },
            ]);
            await dbQueries.addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
            console.log('Role added!');
            break;
        case 'Add Employee':
            const empAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter employee first name:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter employee last name:',
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter role ID for the employee:',
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter manager ID (leave blank if none):',
                },
            ]);
            await dbQueries.addEmployee(empAnswers.firstName, empAnswers.lastName, empAnswers.roleId, empAnswers.managerId || null);
            console.log('Employee added!');
            break;
        // added 'Update Employee Role' case
        case 'Update Employee Role':
            const updateRoleAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter employee ID:',
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter new role ID:',
                },
            ]);
            await dbQueries.updateEmployeeRole(updateRoleAnswers.employeeId, updateRoleAnswers.roleId);
            console.log('Employee role updated!');
            break;
        case 'Update Employee Manager':
            const updateAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter employee ID:',
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter new manager ID:',
                },
            ]);
            await dbQueries.updateEmployeeManager(updateAnswers.employeeId, updateAnswers.managerId);
            console.log('Employee manager updated!');
            break;
        case 'View Employees by Manager':
            const managerAnswer = await inquirer.prompt({
                type: 'input',
                name: 'managerId',
                message: 'Enter manager ID:',
            });
            console.table(await dbQueries.viewEmployeesByManager(managerAnswer.managerId));
            break;
        case 'View Employees by Department':
            const deptViewAnswer = await inquirer.prompt({
                type: 'input',
                name: 'departmentId',
                message: 'Enter department ID:',
            });
            console.table(await dbQueries.viewEmployeesByDepartment(deptViewAnswer.departmentId));
            break;
        case 'Delete Employee':
            const delEmpAnswer = await inquirer.prompt({
                type: 'input',
                name: 'id',
                message: 'Enter employee ID to delete:',
            });
            await dbQueries.deleteEmployee(delEmpAnswer.id);
            console.log('Employee deleted!');
            break;
        case 'View Department Budget':
            const budgetAnswer = await inquirer.prompt({
                type: 'input',
                name: 'departmentId',
                message: 'Enter department ID to calculate budget:',
            });
            const budget = await dbQueries.getDepartmentBudget(budgetAnswer.departmentId);
            console.log(`Total utilized budget: $${budget}`);
            break;
        case 'Exit':
            console.log('Exiting the application.');
            process.exit(0);
    }
    startApp();
};
startApp();
// Initialize application
//connectToDb().then(startApp).catch(console.error);
