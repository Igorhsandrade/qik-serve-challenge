import styles from './styles.module.css';

interface IProps {
  countItem: number;
  countAddButtonOnClick: () => void;
  countRemoveButtonOnClick: () => void;
}

export const CounterInput = (props: IProps) => {
  return (
    <div className={styles.countButtons}>
      <span
        className={styles.removeCountButton}
        onClick={props.countRemoveButtonOnClick}
      ></span>
      {props.countItem}
      <span
        className={styles.addCountButton}
        onClick={props.countAddButtonOnClick}
      ></span>
    </div>
  );
};
