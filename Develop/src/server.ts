import { QueryResult } from 'pg';
import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';

await connectToDb();

