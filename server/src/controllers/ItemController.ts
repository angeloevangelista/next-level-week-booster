import { Request, Response } from 'express';
import { Item } from '../database/entity/Item';

import database from '../database';

class ItemController {
  async index(req: Request, res: Response) {
    const items = await database.then((connection) => connection.manager.find(Item));

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://127.0.0.1:3333/uploads/${item.image}`,
    }));

    return res.json(serializedItems);
  }
}

export default new ItemController();
