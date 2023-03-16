import { db, ipLocationUrl } from '../utils/constants';
import { readFile } from 'fs/promises';
import { IpLocation, Locations } from '../utils/types';
import {
  getDBLocations,
  getIpLocationDetails,
  insertLocation,
} from '../helpers/helper';
import { IUpdateIpLocationDto } from '../dtos/ipLocation.dto';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {

    const locations: Array<IpLocation> = await getDBLocations();

    const location: IpLocation = await getIpLocationDetails(domain);

    locations.push(location);

    await insertLocation(locations);

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

  const parsedData: Array<IpLocation> = await getDBLocations();

  const location = parsedData.find(
    (ipLocation) => ipLocation.id === locationId
  );

  if (!location) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

  return location;
};

export const updateIpLocationById = async (
  payload: IUpdateIpLocationDto
): Promise<any> => {
  const { id, domain, long, lat, geoname_id, isActive } = payload;

  console.log(id, domain, long, lat, geoname_id, isActive);

  const parsedData: Array<IpLocation> = await getDBLocations();

  const location = parsedData.findIndex((ipLocation) => ipLocation.id === id);

  parsedData[location] = {
    id,
    domain,
    long,
    lat,
    geoname_id,
    isActive,
  };

  const upatedLocation = parsedData[location];

  return upatedLocation;
};
