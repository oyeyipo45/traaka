import express from 'express';
import { createIpLocation, getIpLocationById, getIpLocations, updateIpLocationById } from '../controllers/ipLocation.controller';

const router = express.Router();

router.post('/location', createIpLocation);
router.get('/location', getIpLocations);
router.get('/location/:id', getIpLocationById);
router.put('/location/:id', updateIpLocationById);

export default router;