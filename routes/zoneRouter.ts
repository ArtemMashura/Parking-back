import express, { Router } from 'express';

import * as ZoneController from '../controllers/zoneController';

const router: Router = express.Router();

router.get('/zone', ZoneController.getAll);
router.get('/zone/:id', ZoneController.getById);
router.post('/zone', ZoneController.post);
router.patch('/zone/:id', ZoneController.patch);
router.delete('/zone/:id', ZoneController.remove);


export default router;