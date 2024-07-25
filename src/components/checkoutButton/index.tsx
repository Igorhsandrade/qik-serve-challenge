import React from 'react';
import { CustomButton } from '../customButton';
import { appStrings } from '../../constants/appStrings/appStrings';
import { useDispatch } from 'react-redux';
import { resetBasket } from '../../slices/basketSlice';

export const CheckoutButton = () => {
  const dispatch = useDispatch();
  return (
    <CustomButton
      buttonLabel={appStrings.checkoutNow}
      handleButtonClick={() => {
        //TODO: add checkout logic
        dispatch(resetBasket());
        console.log('Checkout');
      }}
    />
  );
};
