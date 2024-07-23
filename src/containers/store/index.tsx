import { useState } from 'react';
import { menu } from '../../mock/menuDetails';
import SectionIcons from '../sectionIcons';

const Store = () => {
  const menuStore = menu;
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <div>
      <p>Search Button</p>
      <div>
        <SectionIcons
          sectionList={menu.sections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <p>
        <p>
          <p>sections list</p>
          <p>items list</p>
        </p>
        <p>basket(desktop only)</p>
      </p>
    </div>
  );
};

export default Store;
