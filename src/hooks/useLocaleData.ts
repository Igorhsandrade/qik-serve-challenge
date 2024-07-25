import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';

export interface ILocaleData {
  city: string;
  country: string;
  timezoneOffset: string;
  locale: string;
  timeZone: string;
  ccy: string;
  ccySymbol: string;
  currency: string;
}

export const useLocaleData = () => {
  const [localeData, setLocaleData] = useState<{
    data?: ILocaleData;
    isDataLoaded: boolean;
  }>({ isDataLoaded: false });
  const { restaurant, isLoadingRestaurant, isSuccessRestaurant } =
    useAppSelector((state) => state.restaurant);
  useEffect(() => {
    if (!isLoadingRestaurant && isSuccessRestaurant) {
      const data: ILocaleData = {
        city: restaurant.city,
        country: restaurant.country,
        timezoneOffset: restaurant.timezoneOffset,
        locale: restaurant.locale,
        timeZone: restaurant.timeZone,
        ccy: restaurant.ccy,
        ccySymbol: restaurant.ccySymbol,
        currency: restaurant.currency
      };
      setLocaleData({ data, isDataLoaded: true });
    }
  }, [restaurant]);
  return localeData;
};
