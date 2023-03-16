import { db, ipLocationUrl } from '../utils/constants';
import { readFile } from 'fs/promises';
import { IpLocation, Locations } from '../utils/types';
import {
  exactString,
  findLocation,
  findLocationByIndex,
  getDBLocations,
  getIpLocationDetails,
  insertLocation,
} from '../helpers/helper';
import { IUpdateIpLocationDto } from '../dtos/ipLocation.dto';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {
    const dbLocations: Array<IpLocation> = await getDBLocations();

    const foundLocation: IpLocation | undefined = dbLocations.find(
      (ipLocation) => exactString(ipLocation?.domain) === exactString(domain)
    );

    if (!foundLocation) {
      const location: IpLocation = await getIpLocationDetails(domain);

      dbLocations.push(location);

      await insertLocation(dbLocations);

      return { data: true };
    }

    return { data: false };
  } catch (error: any) {
    throw error;
  }
};

export const getIpLocations = async (): Promise<any> => {
  return await getDBLocations();
};

export const getIpLocationById = async (id: string): Promise<any> => {
  const locationId = parseInt(id);

  const location = await findLocation(locationId);

  return location;
};

export const updateIpLocationById = async (
  payload: IUpdateIpLocationDto
): Promise<any> => {
  const { id, domain, long, lat, geoname_id, isActive } = payload;

  const { location, dbLocations } = await findLocationByIndex(id);

  dbLocations[location] = {
    id: parseInt(id),
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
  const { location, dbLocations, data } = await findLocationByIndex(id);

  dbLocations[location] = {
    id: data.id,
    domain: data.domain,
    long: data.long,
    lat: data.lat,
    geoname_id: data.geoname_id,
    isActive: false,
  };

  await insertLocation(dbLocations);

  return true;
};
