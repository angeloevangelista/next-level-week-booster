import { Router } from 'express';

import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

const routes = Router();

/**
 * Items
 */
routes.get('/items', ItemController.index);

/**
 * Points
 */
routes.get('/points', PointController.index);

routes.post('/points', PointController.create);

export default routes;
