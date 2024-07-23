import styles from './styles.module.css';
import hamburger from '../../assets/images/hamburger-menu.svg';
import closeMenu from '../../assets/images/close.svg';
import { useState } from 'react';
import MobileMenu from '../mobileMenu';

interface IProps {
  selectedMenuItem: string;
}

const MobileNav = (props: IProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className={styles.mobileNav}>
      <span>{props.selectedMenuItem}</span>
      <div
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
      >
        {isMobileMenuOpen ? (
          <img className={styles.closeButton} src={closeMenu} />
        ) : (
          <img src={hamburger} />
        )}
      </div>
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.opened : ''
        }`}
      >
        <MobileMenu />
      </div>
    </nav>
  );
};

export default MobileNav;
