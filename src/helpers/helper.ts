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

    const locations: Array<IpLocation> = await getDBLocations();

    const foundLocation = locations.find(
      (ipLocation) => exactString(ipLocation?.domain) === exactString(domain)
    );

    if (foundLocation) {
      throw new Error('Location exists already');
    }

    const location: IpLocation = {
      id: locations.length + 1,
      domain: domain,
      long: data.longitude,
      lat: data.latitude,
      geoname_id: data.continentGeoNameId,
      isActive: true,
    };

    return location;
  } catch (error) {
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
    if (err) throw err;
    console.log('Data written to file');
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

  return location;
};
