import { db } from '../utils/constants';
import { readFile } from 'fs/promises';
import { IpLocation, Locations } from '../utils/types';
import { getIpLocationDetails } from '../helpers/helper';

export const createIpLocation = async (domain: string): Promise<any> => {
    try {
      const location   = await getIpLocationDetails(domain);

      return location;
    } catch (error) {
      throw error
    }
};


export const getIpLocations = async (): Promise<any> => {

    const contents: string = await readFile(db, { encoding: 'utf8' });
    
    const parsedData = JSON.parse(contents) as Locations[]
    
    return parsedData;
    
};
