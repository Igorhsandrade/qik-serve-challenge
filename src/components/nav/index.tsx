import { Link } from 'react-router-dom';
import { menuRoutes } from '../../constants/routes/routes';
import styles from './styles.module.css';

interface IProps {
  selectedMenuItem: string;
}

const Nav = (props: IProps) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {Object.values(menuRoutes).map((route) => (
          <li
            key={route.label}
            className={`${
              props.selectedMenuItem.toLocaleLowerCase() ===
              route.label.toLocaleLowerCase()
                ? styles.menuLinkActive
                : ''
            }`}
          >
            <Link className={`${styles.menuLink}`} to={route.path}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
