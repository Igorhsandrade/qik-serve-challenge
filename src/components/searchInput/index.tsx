import { inputSearchPlaceholder } from '../../constants/appStrings/menu';
import styles from './styles.module.css';

const SearchInput = () => {
  //TODO: add serach logic
  return (
    <div className={styles.searchInputContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={inputSearchPlaceholder}
      />
    </div>
  );
};

export default SearchInput;
