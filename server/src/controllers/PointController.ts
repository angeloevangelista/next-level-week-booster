import { Request, Response } from 'express';

import { Point } from '../database/entity/Point';
import { Item } from '../database/entity/Item';

import database from '../database';

class PointController {
  async index(req: Request, res: Response) {
    const points = await database.then((connection) => (
      Point.find()
    ));

    return res.json(points);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: itemIds,
    } = req.body;

    const point = await database.then(async (connection) => {
      const items = await connection.manager.findByIds(Item, itemIds);

      const pointInstance = new Point();

      pointInstance.name = name;
      pointInstance.email = email;
      pointInstance.whatsapp = whatsapp;
      pointInstance.latitude = latitude;
      pointInstance.longitude = longitude;
      pointInstance.city = city;
      pointInstance.uf = uf;
      pointInstance.items = items;

      await pointInstance.save();

      return pointInstance;
    });

    return res.json(point);
  }
}

export default new PointController();
