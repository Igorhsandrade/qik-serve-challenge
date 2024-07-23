import { IMenuItem } from '../../interfaces/menu';
import styles from './style.module.css';

interface IProps {
  item: IMenuItem;
}

const MenuItem = (props: IProps) => {
  return (
    <li className={styles.menuItem}>
      <div className={styles.menuItemInfos}>
        <p className={styles.menuItemName}>{props.item.name}</p>
        {props.item.description && (
          <span className={styles.menuItemDescription}>
            {props.item.description}
          </span>
        )}
        <span className={styles.menuItemPrice}>{props.item.price}</span>
      </div>
      {props.item.images && props.item.images.length > 0 && (
        <div className={styles.menuItemImageContainer}>
          <img src={props.item.images[0].image} />
        </div>
      )}
    </li>
  );
};

export default MenuItem;
