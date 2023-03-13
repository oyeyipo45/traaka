import express from 'express';
import { createIpLocation } from '../controllers/ipLocation.controller';

const router = express.Router();

router.post('/location', createIpLocation);

export default router;