import { NextFunction, Response, Request } from 'express';
import { IUpdateIpLocationDto } from '../dtos/ipLocation.dto';
import * as LocationService from '../services/ipLocation.service';
import { IpLocation } from '../utils/types';

export const createIpLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { domain } = req.body;

    const { data } = await LocationService.createIpLocation(domain);

    res.status(201).json({
      message:
        data === true
          ? `Location created successfully`
          : `Location already exists`,
    });
  } catch (error: any) {
    const errorMessage =
      error?.response?.status === 404
        ? 'Api could not find Domain Details, please try another Domain'
        : error?.message;
    res.status(400).json({
      message: errorMessage,
    });
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
  } catch (error: any) {
    res.status(400).json({
      message: error?.message,
    });
  }
};

export const getIpLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const location: IpLocation = await LocationService.getIpLocationById(id);

    res.status(200).json({
      location,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message,
    });
  }
};

export const updateIpLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { domain, long, lat, geoname_id, isActive } = req.body;

  const payload: IUpdateIpLocationDto = {
    id,
    domain,
    long,
    lat,
    geoname_id,
    isActive,
  };
  try {
    const location = await LocationService.updateIpLocationById(payload);

    res.status(200).json({
      message: `Location with Id ${id} updated successfully`,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message,
    });
  }
};

export const deleteIpLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const location: IpLocation = await LocationService.deleteIpLocation(id);

    res.status(200).json({
      message: `Location with Id ${id} deleted successfully`,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message,
    });
  }
};
