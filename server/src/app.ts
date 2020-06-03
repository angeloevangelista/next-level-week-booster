import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import 'reflect-metadata';

import routes from './routes';

import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes() {
    this.server.use(routes);
  }
}

export default new App().server;
