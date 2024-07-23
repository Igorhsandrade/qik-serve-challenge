import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNav from '../../components/mobileNav';

const Header = () => {
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    if (location) {
      const path = location.pathname.split('/')[1];
      setSelectedMenuItem(path);
    }
  }, [location]);

  return (
    <div>
      <MobileNav selectedMenuItem={selectedMenuItem} />
    </div>
  );
};

export default Header;
