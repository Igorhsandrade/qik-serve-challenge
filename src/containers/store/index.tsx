import { useState } from 'react';
import { MENU as menu } from '../../mock/menuDetails';
import SectionIcons from '../sectionIcons';
import SectionListGroup from '../sectionListGroup';
import styles from './styles.module.css';
import SearchInput from '../../components/searchInput';

const Store = () => {
  const menuStore = menu;
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <div className={styles.storeContainer}>
      <SearchInput />
      <div>
        <SectionIcons
          sectionList={menu.sections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <div>
        <SectionListGroup sections={menu.sections} />
        <p>basket(desktop only)</p>
      </div>
    </div>
  );
};

export default Store;
