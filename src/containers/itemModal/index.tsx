import { useDispatch } from 'react-redux';
import ItemModifier from '../../components/itemModifier';
import { IMenuItem } from '../../interfaces/menu';
import styles from './styles.module.css';
import { resetSelectedItem } from '../../slices/itemSelectionSlice';
import AddItemToBasket from '../../components/addItemToBasket';
import { useState } from 'react';

interface IProps {
  selectedItem: IMenuItem;
}
export interface ISelectedModifiers {
  [modifierId: string]: {
    [modifierItemId: string]: number;
  };
}

const ItemModal = (props: IProps) => {
  const dispacth = useDispatch();
  const [selectedModifiers, setSelectedModifiers] =
    useState<ISelectedModifiers>({});
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
          props.selectedItem.modifiers.map((modifier, id) => (
            <ItemModifier
              key={modifier.id}
              itemModifier={modifier}
              modifierPosition={id}
              setSelectedModifiers={setSelectedModifiers}
              selectedModifiers={selectedModifiers}
            />
          ))}
        <AddItemToBasket
          setSelectedModifiers={setSelectedModifiers}
          selectedModifiers={selectedModifiers}
        />
      </div>
    </div>
  );
};

export default ItemModal;
