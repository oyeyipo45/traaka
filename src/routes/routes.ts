import express from 'express';
import { createIpLocation, getIpLocations } from '../controllers/ipLocation.controller';

const router = express.Router();

router.post('/location', createIpLocation);
router.get('/location', getIpLocations);

export default router;