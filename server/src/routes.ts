import { Router } from 'express';

const routes = Router();

const users = ['Angelo', 'Lucas', 'Pedro', 'Felipe', 'Marcio'];

routes.get('/users', (req, res) => res.json(users));

export default routes;
