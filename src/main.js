import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

import express from 'express';
import { poolPromise } from './infrastructure/database/typeorm/mssql-pool.js';
import { EmployeeRepositoryImpl } from './infrastructure/database/typeorm/repositories/EmployeeRepositoryImpl.js';
import { GetEmployees } from './application/use-cases/GetEmployees.js';
import { GetEmployeeById } from './application/use-cases/GetEmployeeById.js';
import {EmployeeController} from './infrastructure/http/controllers/EmployeeController.js'
const app = express();
app.use(express.json());
// app.use(morgan('dev')); <-- Usar morgan en caso de necesitar observar los tiempos de respuesta, en controllers ya se imprimen respuestas de petición
const pool = await poolPromise; // Conexion a la pool mssql  

const repo = new EmployeeRepositoryImpl(pool);
const getEmployeeUseCase = new GetEmployees(repo);
const getEmployeeByIdUseCase = new GetEmployeeById(repo);
const employeeController = new EmployeeController(getEmployeeUseCase, getEmployeeByIdUseCase);

//Endpoints de companies 
app.get('/employee', (req, res) => employeeController.getAll(req, res));
app.get('/employee/:id', (req, res) => employeeController.getById(req, res));

app.listen(3004, () => {
    console.log('🚀 Microservicio de Compañías (ODBC Nativo) en puerto 3004');
});