import { useAppSelector } from '../../app/hooks';
import {
  appStrings,
  basketTexts,
  interpunct,
  item,
  items
} from '../../constants/appStrings/appStrings';
import styles from './styles.module.css';
import { FullScreenMobileComponent } from '../../components/fullScreenMobileComponent';
import { BasketList } from '../basketList';
import { useState } from 'react';

export const MobileBasket = () => {
  const [isShowingBasket, setIsShowingBasket] = useState(false);
  const basket = useAppSelector((state) => state.basket);

  const handleCloseBasket = () => {
    setIsShowingBasket(false);
  };
  return (
    <>
      {Object.keys(basket.items).length > 0 && (
        <div className={styles.basketButtonContainer}>
          <button
            className={styles.basketButton}
            onClick={() => setIsShowingBasket((prevState) => !prevState)}
          >
            {basketTexts.yourBasket} {interpunct} {basket.totalItems}{' '}
            {basket.totalItems > 1 ? items : item}
          </button>
        </div>
      )}
      {isShowingBasket && (
        <FullScreenMobileComponent
          title={appStrings.basket}
          handleCloseButton={handleCloseBasket}
        >
          <BasketList />
        </FullScreenMobileComponent>
      )}
    </>
  );
};
