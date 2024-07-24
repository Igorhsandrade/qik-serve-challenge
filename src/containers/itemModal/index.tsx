import { useDispatch } from 'react-redux';
import ItemModifier from '../../components/itemModifier';
import { IMenuItem } from '../../interfaces/menu';
import styles from './styles.module.css';
import { resetSelectedItem } from '../../slices/itemSelectionSlice';
import AddItemToBasket from '../../components/addItemToBasket';

interface IProps {
  selectedItem: IMenuItem;
}

const ItemModal = (props: IProps) => {
  const dispacth = useDispatch();

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <span
          className={styles.modalCloseButton}
          onClick={() => dispacth(resetSelectedItem())}
        ></span>
        {props.selectedItem.images && props.selectedItem.images[0] && (
          <div className={styles.modalImageWrapper}>
            <img src={props.selectedItem.images[0].image} />
          </div>
        )}
        <div className={styles.modalItemDescription}>
          <p>{props.selectedItem.name}</p>
          <span>{props.selectedItem.description}</span>
        </div>
        {props.selectedItem.modifiers &&
          props.selectedItem.modifiers.map((modifier) => (
            <ItemModifier itemModifier={modifier} />
          ))}
        <AddItemToBasket />
      </div>
    </div>
  );
};

export default ItemModal;
