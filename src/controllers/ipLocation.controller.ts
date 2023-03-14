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

    res.status(200).json({
      locations,
    });
  } catch (error) {
    throw error;
  }
};

export const getIpLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const { id } = req.params
  try {
    const location: IpLocation = await LocationService.getIpLocationById(id);

    res.status(200).json({
      location,
    });
  } catch (error) {
    throw error;
  }
};