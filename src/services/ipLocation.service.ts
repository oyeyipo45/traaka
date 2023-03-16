import { IUpdateIpLocationDto } from '../dtos/ipLocation.dto';
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

    return locations;
  } catch (error) {
    throw error;
  }
};


export const getIpLocationById = async (id : string): Promise<any> => {
  try {
    const locations = await ipLocationRepository.getIpLocationById(id);

    return locations;
  } catch (error) {
    throw error;
  }
};


export const updateIpLocationById = async (
  payload: IUpdateIpLocationDto
): Promise<any> => {
  try {
    const locations = await ipLocationRepository.updateIpLocationById(payload);

    return locations;
  } catch (error) {
    throw error;
  }
};


export const deleteIpLocation = async (
  id: string
): Promise<any> => {
  try {
    const location = await ipLocationRepository.deleteIpLocation(id);

    return location;
  } catch (error) {
    throw error;
  }
};