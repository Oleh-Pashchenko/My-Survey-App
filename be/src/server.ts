import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import http from 'http';
import 'reflect-metadata';
import app from './app';


const server = http.createServer(app);
console.log()
const port = process.env.BE_PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  console.error(error);

  process.exit(1);
});
export default server;
