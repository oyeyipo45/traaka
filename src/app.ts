import express, { Application } from 'express';
import cors from 'cors';
import 'reflect-metadata';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;