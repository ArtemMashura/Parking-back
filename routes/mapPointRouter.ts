import express, { Router } from 'express';

import * as MapPointController from '../controllers/mapPointController';

const router: Router = express.Router();

router.get('/mappoint', MapPointController.getAll);
router.get('/mappoint/:id', MapPointController.getById);
router.post('/mappoint/many', MapPointController.postMany);
router.post('/mappoint', MapPointController.post);
router.patch('/mappoint/:id', MapPointController.patch);
router.delete('/mappoint/:id', MapPointController.remove);


export default router;