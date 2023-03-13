import { getIpLocationDetails } from '../helpers/helper';

export const createIpLocation = async (domain: string): Promise<any> => {
  try {
    console.log(domain);
    try {
      const location = await getIpLocationDetails(domain);

      return location;
    } catch (error) {
      console.log(error, 'locator');
    }
  } catch (error) {
    throw error;
  }
};
