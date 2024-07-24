import { useAppSelector } from '../app/hooks';

export const useWebSettings = () => {
  const settings = useAppSelector(
    (state) => state.restaurant.restaurant.webSettings
  );
  return settings;
};
