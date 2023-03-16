import axios from 'axios';
import { readFile } from 'fs/promises';
import { config } from '../config/config';
import { db } from '../utils/constants';
import { IpLocation } from '../utils/types';
import fs from 'fs';

const API_KEY = config.API_KEY;
const X_RapidAPI_Key = config.X_RapidAPI_Key;

export const getIpLocationDetails = async (domain: string) => {
  try {
    const locations: Array<IpLocation> = await getDBLocations();

    const foundLocation = locations.find(
      (ipLocation) => exactString(ipLocation?.domain) === exactString(domain)
    );

    const { data } = await axios.get(
      'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
      {
        params: {
          ip: domain,
          apikey: API_KEY,
        },
        headers: {
          'X-RapidAPI-Key': X_RapidAPI_Key,
          'X-RapidAPI-Host':
            'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
        },
      }
    );

    const location: IpLocation = {
      id: locations.length + 1,
      domain: domain,
      long: data.longitude,
      lat: data.latitude,
      geoname_id: data.continentGeoNameId,
      isActive: true,
    };

    return location;
  } catch (error: any) {
    throw error;
  }
};

export const getDBLocations = async () => {
  const contents: string = await readFile(db, { encoding: 'utf8' });

  const parsedData = JSON.parse(contents);

  return parsedData;
};

export const insertLocation = async (locations: Array<IpLocation>) => {
  let data = JSON.stringify(locations, null, 2);

  fs.writeFile(db, data, (err) => {
    if (err)
      throw new Error('Error occures while inserting locations to database');
  });

  return true;
};

export const exactString = (domain: string | undefined) => {
  return domain
    ?.toLowerCase()
    ?.replace(/\s/g, '')
    ?.replace(/[^\w\s]/gi, '');
};

export const findLocation = async (id: number) => {
  const parsedData: Array<IpLocation> = await getDBLocations();

  const location = parsedData.find((ipLocation) => ipLocation.id === id);

  if (!location) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

  return location;
};

export const findLocationByIndex = async (id: string) => {
  const locationId = parseInt(id);

  const dbLocations: Array<IpLocation> = await getDBLocations();

  const location = dbLocations.findIndex(
    (ipLocation) => ipLocation.id === locationId
  );

  if (location < 0) {
    throw new Error(`Location with id : ${id} does not exist`);
  }

  const data = await findLocation(locationId);

  return { location, dbLocations, data };
};
