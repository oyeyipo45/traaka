import { NextFunction, Response, Request } from 'express';
import * as LocationService from '../services/ipLocation.service';
import { IpLocation } from '../utils/types';


export const createIpLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const { domain } = req.body;

    const location: IpLocation = await LocationService.createIpLocation(domain);

    res.status(201).json({
      location,
    });
  } catch (error) {
    throw error;
  }
};

export const getIpLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

      const locations: IpLocation = await LocationService.getIpLocations();
      
      console.log(locations, 'locations');
      

    res.status(200).json({
      locations,
    });
  } catch (error) {
    throw error;
  }
};