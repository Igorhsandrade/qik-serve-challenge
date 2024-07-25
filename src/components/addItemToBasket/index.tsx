import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLocaleData } from '../../hooks/useLocaleData';
import { ISelectedModifiers } from '../../containers/itemModal';
import { addItemToBasket } from '../../slices/basketSlice';
import { CounterInput } from '../counterInput';

interface IProps {
  setSelectedModifiers: (state: ISelectedModifiers) => void;
  selectedModifiers: ISelectedModifiers;
}

const AddItemToBasket = (props: IProps) => {
  const { data, isDataLoaded } = useLocaleData();
  const selectedItem = useAppSelector(
    (state) => state.itemSelection.selectedItem
  );
  const dispacth = useAppDispatch();
  const [itemToCardCount, setItemToCardCount] = useState(1);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);

  const updateTotalItemPrice = () => {
    const total = Object.entries(props.selectedModifiers).reduce(
      (acc, [modifierId, modifierItems]) => {
        return (
          acc +
          Object.entries(modifierItems).reduce(
            (acc, [modifierItemId, value]) => {
              return (
                acc +
                (selectedItem.modifiers
                  ?.find((modifier) => modifier.id.toString() === modifierId)
                  ?.items.find((item) => item.id.toString() === modifierItemId)
                  ?.price || 0) *
                  value
              );
            },
            0
          )
        );
      },
      selectedItem.price
    );
    setItemTotalPrice(total * itemToCardCount);
  };

  useEffect(() => {
    updateTotalItemPrice();
  }, [selectedItem, itemToCardCount, props.selectedModifiers]);

  const addItemToCount = () => {
    setItemToCardCount((prevState) => {
      prevState = prevState + 1;
      return prevState;
    });
  };

  const removeItemFromCount = () => {
    setItemToCardCount((prevState) => {
      if (prevState > 1) {
        prevState = prevState - 1;
      }
      return prevState;
    });
  };

  return (
    <>
      {isDataLoaded && (
        <div className={styles.addItemToCardContainer}>
          <CounterInput
            countRemoveButtonOnClick={removeItemFromCount}
            countAddButtonOnClick={addItemToCount}
            countItem={itemToCardCount}
          />
          <button
            className={styles.addToCardAddButton}
            onClick={() =>
              dispacth(
                addItemToBasket({
                  itemId: selectedItem.id,
                  modifiers: props.selectedModifiers,
                  quantity: itemToCardCount
                })
              )
            }
          >
            Add ·{' '}
            {itemTotalPrice.toLocaleString(data?.locale, {
              style: 'currency',
              currency: data?.ccy
            })}
          </button>
        </div>
      )}
    </>
  );
};

export default AddItemToBasket;
