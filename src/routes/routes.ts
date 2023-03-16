import express from 'express';
import {
  createIpLocation,
  getIpLocationById,
  getIpLocations,
  updateIpLocationById,
  deleteIpLocation,
} from '../controllers/ipLocation.controller';

const router = express.Router();

router.post('/location', createIpLocation);
router.get('/location', getIpLocations);
router.get('/location/:id', getIpLocationById);
router.put('/location/:id', updateIpLocationById);
router.delete('/location/:id', deleteIpLocation);


export default router;