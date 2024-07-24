import { IMenu } from '../interfaces/menu';
import { IRestaurant } from '../interfaces/restaurant';
import { MENU } from '../mock/menuDetails';
import { RESTAURANT } from '../mock/restaurant';

type TMockAPiCall<T> = {
  data: T;
  status: number;
};

const mockApiCall = (mockedData: any, timeOut = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(() => ({
        status: 200,
        data: mockedData
      }));
    }, timeOut);
  });
};

export const getAsyncRestaurant = async () => {
  try {
    const response = (await mockApiCall(
      RESTAURANT
    )) as TMockAPiCall<IRestaurant>;
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getAsyncMenuDetails = async () => {
  try {
    const response = (await mockApiCall(MENU)) as TMockAPiCall<IMenu>;
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};
