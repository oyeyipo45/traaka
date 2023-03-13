import express, { Application } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import location from './routes/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', location);

export default app;