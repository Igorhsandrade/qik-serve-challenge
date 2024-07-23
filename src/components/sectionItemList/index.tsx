import { ISection } from '../../interfaces/menu';
import arrowDown from '../../assets/images/down-arrow.svg';
import styles from './styles.module.css';
import { useState } from 'react';
import MenuItem from '../menuItem';

interface IProps {
  section: ISection;
}

const SectionItemList = (props: IProps) => {
  const [isShowingItems, setIsShowingItems] = useState(false);
  return (
    <div className={styles.sectionItemList}>
      <div
        className={styles.sectionItemLabel}
        onClick={() => setIsShowingItems((prevState) => !prevState)}
      >
        <div className={styles.sectionLabelText}>{props.section.name}</div>
        <span className={styles.sectionLabelIcon}>
          <img
            className={`${isShowingItems ? styles.opened : ''}`}
            src={arrowDown}
          />
        </span>
      </div>
      <div
        className={`${styles.sectionItems} ${
          isShowingItems ? styles.opened : ''
        }`}
      >
        <ul>
          {props.section.items.map((item) => (
            <MenuItem item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionItemList;
