import Header from '../header';
import AppRoutes from '../appRoutes';
import styles from './styles.module.css';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className={styles.pagesContainer}>
        <AppRoutes />
      </div>
    </div>
  );
};

export default Layout;
