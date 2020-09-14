import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';
import sessionRoutes from './routes/session.routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(cors());
    this.server.use(roleRoutes);
    this.server.use(userRoutes);
    this.server.use(sessionRoutes);
  }
}

export default new App().server;
