import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ErrorMiddleware } from './middleware/error.middleware';
import responseRoutes from './routes/responseRoutes';
import surveyRoutes from './routes/surveyRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config({ path: '../.env' });

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const app = express();

app.use(ErrorMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use('/', surveyRoutes);
app.use('/', userRoutes);
app.use('/', responseRoutes);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Survey API Documentation',
    version: '1.0.0',
    description: 'APIs for creating and responding to surveys',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['swagger.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;

