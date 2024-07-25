import { useState } from 'react';
import SectionIcons from '../sectionIcons';
import SectionListGroup from '../sectionListGroup';
import styles from './styles.module.css';
import SearchInput from '../../components/searchInput';
import { MobileBasket } from '../mobileBasket';
import { BasketList } from '../basketList';
import { appStrings } from '../../constants/appStrings/appStrings';

const Store = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <div className={styles.storeContainer}>
      <SearchInput />
      <div className={styles.itemsAndBasketWrapper}>
        <div className={styles.itemsListWrapper}>
          <SectionIcons
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <SectionListGroup />
        </div>
        <div className={styles.basketWrapper}>
          <p className={styles.basketTitle}>{appStrings.basket}</p>
          <BasketList />
        </div>
        <MobileBasket />
      </div>
    </div>
  );
};

export default Store;
