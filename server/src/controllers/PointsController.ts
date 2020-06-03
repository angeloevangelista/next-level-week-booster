import { Request, Response } from 'express';

import { Point } from '../database/entity/Point';
import { Item } from '../database/entity/Item';

class PointController {
  async index(req: Request, res: Response) {
    const points = await Point.find();

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

    const items = await Item.findByIds(itemIds);

    const point = new Point();

    point.name = name;
    point.email = email;
    point.whatsapp = whatsapp;
    point.latitude = latitude;
    point.longitude = longitude;
    point.city = city;
    point.uf = uf;
    point.items = items;

    await point.save();

    return res.json(point);
  }
}

export default new PointController();
