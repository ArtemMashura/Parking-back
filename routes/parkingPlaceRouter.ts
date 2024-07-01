import express, { Router } from 'express';

import * as ParkingPlaceController from '../controllers/parkingPlaceController';

const router: Router = express.Router();

router.get('/parkingplace', ParkingPlaceController.getAll);
router.get('/parkingplace/:id', ParkingPlaceController.getById);
router.post('/parkingplace', ParkingPlaceController.post);
router.patch('/parkingplace/:id', ParkingPlaceController.patch);
router.delete('/parkingplace/:id', ParkingPlaceController.remove);


export default router;