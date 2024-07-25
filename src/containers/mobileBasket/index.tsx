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
import { CustomButton } from '../../components/customButton';
import { CheckoutButton } from '../../components/checkoutButton';

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
          <CustomButton
            handleButtonClick={() =>
              setIsShowingBasket((prevState) => !prevState)
            }
            buttonLabel={`${basketTexts.yourBasket} ${interpunct} ${
              basket.totalItems
            } ${basket.totalItems > 1 ? items : item}`}
          />
        </div>
      )}
      {isShowingBasket && (
        <FullScreenMobileComponent
          title={appStrings.basket}
          handleCloseButton={handleCloseBasket}
        >
          <BasketList />
          <div className={styles.checkoutButtonWrapper}>
            <CheckoutButton />
          </div>
        </FullScreenMobileComponent>
      )}
    </>
  );
};
