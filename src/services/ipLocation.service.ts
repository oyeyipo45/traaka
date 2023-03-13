import * as ipLocationRepository from '../repository/ipLocation.repository';

export const createIpLocation = async (domain : String): Promise<any> => {
  try {
    const user = await ipLocationRepository.createIpLocation(domain);

    return user;
  } catch (error) {
    throw error;
  }
};
