import { useDispatch } from 'react-redux';
import ItemModifier from '../../components/itemModifier';
import { IMenuItem } from '../../interfaces/menu';
import styles from './styles.module.css';
import { resetSelectedItem } from '../../slices/itemSelectionSlice';
import AddItemToBasket from '../../components/addItemToBasket';
import { useEffect, useState } from 'react';
import { GenericModal } from '../../components/genericModal';
import { useAppSelector } from '../../app/hooks';

export interface ISelectedModifiers {
  [modifierId: string]: {
    [modifierItemId: string]: number;
  };
}

const ItemModal = () => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const dispacth = useDispatch();
  const [selectedModifiers, setSelectedModifiers] =
    useState<ISelectedModifiers>({});
  const { selectedItem, isItemSelected } = useAppSelector(
    (state) => state.itemSelection
  );

  const handleCloseModal = () => {
    dispacth(resetSelectedItem());
    setIsShowingModal(false);
  };

  useEffect(() => {
    if (isItemSelected) {
      setIsShowingModal(true);
    }
  }, [selectedItem]);

  return (
    <GenericModal
      isShowingModal={isShowingModal}
      handleCloseModal={handleCloseModal}
    >
      <>
        {selectedItem.images && selectedItem.images[0] && (
          <div className={styles.modalImageWrapper}>
            <img src={selectedItem.images[0].image} />
          </div>
        )}
        <div className={styles.modalItemDescription}>
          <p>{selectedItem.name}</p>
          <span>{selectedItem.description}</span>
        </div>
        {selectedItem.modifiers &&
          selectedItem.modifiers.map((modifier, id) => (
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
      </>
    </GenericModal>
  );
};

export default ItemModal;
