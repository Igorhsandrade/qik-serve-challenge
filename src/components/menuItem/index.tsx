import { useDispatch } from 'react-redux';
import { IMenuItem } from '../../interfaces/menu';
import styles from './style.module.css';
import { selectItem } from '../../slices/itemSelectionSlice';
import { useLocaleData } from '../../hooks/useLocaleData';

interface IProps {
  item: IMenuItem;
}

const MenuItem = (props: IProps) => {
  const dispatch = useDispatch();
  const { data, isDataLoaded } = useLocaleData();

  return (
    <>
      {isDataLoaded && (
        <li
          className={styles.menuItem}
          onClick={() => dispatch(selectItem(props.item))}
        >
          <div className={styles.menuItemInfos}>
            <p className={styles.menuItemName}>{props.item.name}</p>
            {props.item.description && (
              <span className={styles.menuItemDescription}>
                {props.item.description}
              </span>
            )}
            <span className={styles.menuItemPrice}>
              {props.item.modifiers
                ? props.item.modifiers[0].items[0].price.toLocaleString(
                    data?.locale,
                    {
                      style: 'currency',
                      currency: data?.ccy
                    }
                  )
                : props.item.price.toLocaleString(data?.locale, {
                    style: 'currency',
                    currency: data?.ccy
                  })}
            </span>
          </div>
          {props.item.images && props.item.images.length > 0 && (
            <div className={styles.menuItemImageContainer}>
              <img src={props.item.images[0].image} />
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default MenuItem;
