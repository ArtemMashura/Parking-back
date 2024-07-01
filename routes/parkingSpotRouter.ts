import express, { Router } from 'express';

import * as ParkingSpotController from '../controllers/parkingSpotController';

const router: Router = express.Router();

router.get('/parkingspot', ParkingSpotController.getAll);
router.get('/parkingspot/:id', ParkingSpotController.getById);
router.post('/parkingspot', ParkingSpotController.post);
router.patch('/parkingspot/:id', ParkingSpotController.patch);
router.delete('/parkingspot/:id', ParkingSpotController.remove);


export default router;