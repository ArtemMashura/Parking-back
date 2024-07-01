import express, { Router } from 'express';

import * as OrdersController from '../controllers/ordersController';

const router: Router = express.Router();

router.get('/orders', OrdersController.getAll);
router.get('/orders/:id', OrdersController.getById);
router.post('/orders', OrdersController.post);
router.patch('/orders/:id', OrdersController.patch);
router.delete('/orders/:id', OrdersController.remove);


export default router;