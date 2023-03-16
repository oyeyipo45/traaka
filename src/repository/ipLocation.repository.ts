import { db, ipLocationUrl } from '../utils/constants';
import { readFile } from 'fs/promises';
import { IpLocation, Locations } from '../utils/types';
import {
  findLocation,
  getDBLocations,
  getIpLocationDetails,
  insertLocation,
} from '../helpers/helper';
import { IUpdateIpLocationDto } from '../dtos/ipLocation.dto';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {

    const dbLocations: Array<IpLocation> = await getDBLocations();

    const location: IpLocation = await getIpLocationDetails(domain);

    dbLocations.push(location);

    await insertLocation(dbLocations);

    return location;
  } catch (error) {
    throw error;
  }
};

export const getIpLocations = async (): Promise<any> => {
  return await getDBLocations();
};

export const getIpLocationById = async (id: string): Promise<any> => {
  const locationId = parseInt(id);

  const location = await findLocation(locationId);

  if (!location) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

  return location;
};

export const updateIpLocationById = async (
  payload: IUpdateIpLocationDto
): Promise<any> => {
  const { id, domain, long, lat, geoname_id, isActive } = payload;

  const dbLocations: Array<IpLocation> = await getDBLocations();

  const location = dbLocations.findIndex((ipLocation) => ipLocation.id === id);

  if (location < 0) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

  dbLocations[location] = {
    id,
    domain,
    long,
    lat,
    geoname_id,
    isActive,
  };

  const updatedLocation = dbLocations[location];

  await insertLocation(dbLocations);

  return updatedLocation;
};


export const deleteIpLocation = async (id: string): Promise<any> => {
  const locationId = parseInt(id);

 const location = await findLocation(locationId);

  if (!location) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

   const dbLocations: Array<IpLocation> = await getDBLocations();

  const newLocations = dbLocations.filter((location) => location.id !== locationId)

  await insertLocation(newLocations);
  
  return true;
};