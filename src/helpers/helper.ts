import axios from 'axios';
import { ipLocationUrl } from '../utils/constants';
import { IpLocation } from '../utils/types';

const API_KEY = process.env.API_KEY

export const getIpLocationDetails = async (domain: string) => {
    try {
      
    // const {data} = await axios.get(
    //   `${ipLocationUrl}?apiKey=e153305b9df9426a932ae61c2c5516ca&ip=${domain}`
    // );

    return {
      id: 1,
      domain: "google.com",
      lat: "37.42240",
      long: "-122.08421",
      geoname_id: "6301403",
      isActive: true
    }
  } catch (error) {
    throw error
  }
};
