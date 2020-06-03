import { Router, Request, Response } from 'express';

import database from './database';
import { Item } from './database/entity/Item';

const routes = Router();

routes.get('/', async (req, res) => {
  const items = await database.then((connection) => connection.manager.find(Item));

  return res.json(items);
});

export default routes;
