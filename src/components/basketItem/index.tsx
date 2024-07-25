import { useDispatch } from 'react-redux';
import {
  addItemToBasket,
  IBasketItem,
  removeItemFromBasket
} from '../../slices/basketSlice';
import { CounterInput } from '../counterInput';
import styles from './styles.module.css';
import { useLocaleData } from '../../hooks/useLocaleData';

interface IProps {
  basketItem: IBasketItem;
  itemName: string;
  modifiersNames: {
    modifierItemName: string;
    modifierItemPrice: number;
  }[];
}

export const BasketItem = (props: IProps) => {
  const dispatch = useDispatch();
  const { isDataLoaded, data } = useLocaleData();
  const handleAddItem = () => {
    dispatch(addItemToBasket({ ...props.basketItem, quantity: 1 }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromBasket({ ...props.basketItem, quantity: 1 }));
  };

  return (
    <>
      {isDataLoaded && (
        <div className={styles.basketItem}>
          <div className={styles.baskItemTitle}>
            <p>{props.itemName}</p>
            <span>
              {(
                props.basketItem.price * props.basketItem.quantity
              ).toLocaleString(data?.locale, {
                style: 'currency',
                currency: data?.ccy
              })}
            </span>
          </div>
          {props.modifiersNames.length > 0 && (
            <ul>
              {props.modifiersNames.map((modifier) => (
                <li key={modifier.modifierItemName}>{`${
                  modifier.modifierItemName
                } (+${modifier.modifierItemPrice.toLocaleString(data?.locale, {
                  style: 'currency',
                  currency: data?.ccy
                })})`}</li>
              ))}
            </ul>
          )}
          <div style={{ alignSelf: 'start' }}>
            <CounterInput
              countItem={props.basketItem.quantity}
              countAddButtonOnClick={handleAddItem}
              countRemoveButtonOnClick={handleRemoveItem}
            />
          </div>
        </div>
      )}
    </>
  );
};
