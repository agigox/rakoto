import { BACK_SERVER_SIMULATOR_URL } from 'utils/constants';
import { type IStrategy } from 'models/Strategy';
import axios, { type AxiosResponse } from 'axios';
import { type IFilters } from 'models/Filters';

// This function is temporary, to simulate that the backend may take eome time to respond
const wait = async (ms: number): Promise<number> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getStrategies = async (): Promise<AxiosResponse<IStrategy[]>> => {
  await wait(500);
  return await axios.get<IStrategy[]>(`${BACK_SERVER_SIMULATOR_URL}strategies`);
};

export const postStrategies = async (filters: IFilters): Promise<number> => {
  // return await axios.post(`${BACK_SERVER_SIMULATOR_URL}filters`, filters);
  return await wait(500);
};
