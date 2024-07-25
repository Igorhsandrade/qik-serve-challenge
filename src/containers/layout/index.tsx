import Header from '../header';
import AppRoutes from '../appRoutes';
import styles from './styles.module.css';
import ItemModal from '../itemModal';
import { useAppSelector } from '../../app/hooks';

const Layout = () => {
  const { isItemSelected } = useAppSelector((state) => state.itemSelection);
  const { isLoadingMenu, isSuccessMenu } = useAppSelector(
    (state) => state.menu
  );
  const { isLoadingRestaurant, isSuccessRestaurant } = useAppSelector(
    (state) => state.restaurant
  );

  return (
    <>
      {!isLoadingMenu &&
        !isLoadingRestaurant &&
        isSuccessMenu &&
        isSuccessRestaurant && (
          <div className={styles.layoutContainer}>
            <Header />
            <div className={styles.pagesContainer}>
              <AppRoutes />
            </div>
            {isItemSelected && <ItemModal />}
          </div>
        )}{' '}
    </>
  );
};

export default Layout;
