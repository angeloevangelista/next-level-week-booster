import { Router } from 'express';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = Router();

/**
 * Items
 */
routes.get('/items', ItemsController.index);

/**
 * Points
 */
routes.get('/points', PointsController.index);

routes.get('/points/:pointId', PointsController.show);

routes.post('/points', PointsController.create);

export default routes;
