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
  const [localeData, setLocaleData] = useState<ILocaleData>();
  const { restaurant, isLoadingRestaurant, isSuccessRestaurant } =
    useAppSelector((state) => state.restaurant);

  console.log(`test`);
  useEffect(() => {
    if (!isLoadingRestaurant && isSuccessRestaurant) {
      console.log(`test`);
      const {
        city,
        country,
        timezoneOffset,
        locale,
        timeZone,
        ccy,
        ccySymbol,
        currency
      } = restaurant;
      setLocaleData({
        city,
        country,
        timezoneOffset,
        locale,
        timeZone,
        ccy,
        ccySymbol,
        currency
      });
    }
  }, []);
  console.log(restaurant);
  return localeData;
};
