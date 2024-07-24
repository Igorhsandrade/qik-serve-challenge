import { useState } from 'react';
import styles from './styles.module.css';
import { useAppSelector } from '../../app/hooks';

const AddItemToBasket = () => {
  const selectedItem = useAppSelector(
    (state) => state.itemSelection.selectedItem
  );
  const [itemToCardCount, setItemToCardCount] = useState(1);
  return (
    <div className={styles.addItemToCardContainer}>
      <div className={styles.addToCardCountButtons}>
        <span
          className={styles.addToCardRemoveCount}
          onClick={() =>
            setItemToCardCount((prevState) => {
              if (prevState > 1) {
                prevState = prevState - 1;
              }
              return prevState;
            })
          }
        ></span>
        {itemToCardCount}
        <span
          className={styles.addToCardAddCount}
          onClick={() =>
            setItemToCardCount((prevState) => {
              prevState = prevState + 1;
              return prevState;
            })
          }
        ></span>
      </div>
      <button className={styles.addToCardAddButton}>
        Add ·{' '}
        {(selectedItem.price * itemToCardCount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </button>
    </div>
  );
};

export default AddItemToBasket;
