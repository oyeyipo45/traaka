import * as ipLocationRepository from '../repository/ipLocation.repository';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {
    const location = await ipLocationRepository.createIpLocation(domain);

    return location;
  } catch (error) {
    throw error;
  }
};
