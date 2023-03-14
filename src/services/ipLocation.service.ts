import * as ipLocationRepository from '../repository/ipLocation.repository';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {
    const location = await ipLocationRepository.createIpLocation(domain);

    return location;
  } catch (error) {
    throw error;
  }
};


export const getIpLocations = async (): Promise<any> => {
  try {
    const locations = await ipLocationRepository.getIpLocations();

    console.log(locations, 'locations2');
    

    return locations;
  } catch (error) {
    throw error;
  }
};
