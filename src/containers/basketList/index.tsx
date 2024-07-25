import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useAppSelector } from '../../app/hooks';
import { IBasketItem } from '../../slices/basketSlice';
import { v4 as uuid } from 'uuid';
import { BasketItem } from '../../components/basketItem';
import { useLocaleData } from '../../hooks/useLocaleData';
import {
  appStrings,
  item,
  subtotal,
  total
} from '../../constants/appStrings/appStrings';

export const BasketList = () => {
  const basket = useAppSelector((state) => state.basket);
  const { isDataLoaded, data } = useLocaleData();
  const { itemIdsToNames, modifierIdsToNames } = useAppSelector(
    (state) => state.menu
  );
  const [itemsList, setItemsList] = useState<IBasketItem[]>([]);
  const bucketItemsToList = (items: { [itemId: string]: IBasketItem[] }) => {
    const itemsList = Object.values(items).flat(Infinity) as IBasketItem[];
    return itemsList;
  };

  useEffect(() => {
    if (basket.totalItems > 0) {
      setItemsList(bucketItemsToList(basket.items));
    } else {
      setItemsList([]); // Reset the items list if the basket is empty
    }
  }, [basket.items]);

  return (
    <>
      {isDataLoaded && basket.totalItems > 0 ? (
        <div className={styles.basketListContainer}>
          <ul className={styles.basketList}>
            {itemsList.length > 0 &&
              itemsList.map((item) => (
                <li key={uuid()} className={styles.basketListItem}>
                  <BasketItem
                    basketItem={item}
                    itemName={itemIdsToNames[parseInt(item.itemId)]}
                    modifiersNames={Object.values(item.modifiers)
                      .reduce((acc, modifiers) => {
                        const modifiersKeys = Object.keys(modifiers);
                        return acc.concat(modifiersKeys);
                      }, [] as string[])
                      .map(
                        (modifierId) => modifierIdsToNames[parseInt(modifierId)]
                      )}
                  />
                </li>
              ))}
          </ul>
          <div className={styles.basketListTotalContainer}>
            <div className={styles.basketListSubTotalText}>
              <p>{subtotal}: </p>
              <span>
                {basket.total.toLocaleString(data?.locale, {
                  style: 'currency',
                  currency: data?.ccy
                })}
              </span>
            </div>
            <div className={styles.basketListTotalText}>
              <p>{total}: </p>
              <span>
                {basket.total.toLocaleString(data?.locale, {
                  style: 'currency',
                  currency: data?.ccy
                })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.emptyBasket}>{appStrings.emptyBasket}</p>
      )}
    </>
  );
};
