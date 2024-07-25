import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNav from '../../components/mobileNav';
import Nav from '../../components/nav';
import styles from './styles.module.css';

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
    <div className={styles.header}>
      <MobileNav selectedMenuItem={selectedMenuItem} />
      <Nav selectedMenuItem={selectedMenuItem} />
      <div className={styles.headerImageContainer}>
        <img src="https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png" />
      </div>
    </div>
  );
};

export default Header;
