import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import express from 'express';
import { poolPromise } from './infrastructure/database/typeorm/mssql-pool.js';
import { TypeDocumentRepositoryImpl } from './infrastructure/database/typeorm/repositories/TypeDocumentRepositoryImpl.js';
import { GetTypeDocuments } from './application/use-cases/GetTypeDocuments.js';
import { GetTypeDocumentsById } from './application/use-cases/GetTypeDocumentsById.js';
import { TypeDocumentController } from './infrastructure/http/controllers/TypeDocumentController.js';
const app = express();
app.use(express.json());
// app.use(morgan('dev')); <-- Usar morgan en caso de necesitar observar los tiempos de respuesta, en controllers ya se imprimen respuestas de petición
const pool = await poolPromise; // Conexion a la pool mssql  

const repo = new TypeDocumentRepositoryImpl(pool);
const getTypeDocumentsUseCase = new GetTypeDocuments(repo);
const getTypeDocumentsByIdUseCase = new GetTypeDocumentsById(repo);
const typeDocumentController = new TypeDocumentController(getTypeDocumentsUseCase, getTypeDocumentsByIdUseCase);

//Endpoints de companies 
app.get('/typedocuments', (req, res) => typeDocumentController.getAll(req, res));
app.get('/typedocuments/:id', (req, res) => typeDocumentController.getById(req, res));
app.listen(3007, () => {
  console.log('🚀 Microservicio de Compañías (ODBC Nativo) en puerto 3007');
});