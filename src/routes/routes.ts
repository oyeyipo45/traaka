import express from 'express';
import { createIpLocation, getIpLocationById, getIpLocations } from '../controllers/ipLocation.controller';

const router = express.Router();

router.post('/location', createIpLocation);
router.get('/location', getIpLocations);
router.get('/location/:id', getIpLocationById);

export default router;