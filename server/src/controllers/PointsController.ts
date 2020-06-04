import { Request, Response } from 'express';

import { In } from 'typeorm';
import { Point } from '../database/entity/Point';
import { Item } from '../database/entity/Item';

class PointController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item: string) => Number(item.trim()));

    const points = await Point.find({
      where: {
        id: In(parsedItems),
        city: String(city),
        uf: String(uf),
      },
    });

    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const { pointId } = req.params;

    const point = await Point.findOne({
      where: {
        id: pointId,
      },
      relations: ['items'],
    });

    if (!point) {
      return res.status(400).json({ error: 'Point not found' });
    }

    return res.json(point);
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

    point.image = 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60';
    // foto fixa para que não dê erro lá aonde o Diegao falou

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
