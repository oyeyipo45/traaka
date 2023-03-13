import axios from 'axios';
import { ipLocationUrl } from '../utils/constants';

const API_KEY = process.env.API_KEY

export const getIpLocationDetails = async (domain: string) => {
    try {
      
    const ipLocation = await axios.get(
      `${ipLocationUrl}?apiKey=${API_KEY}&ip=${domain}`
    );

    console.log(ipLocation, 'ipLocation');
  } catch (error) {
    console.log(error);
  }
};
