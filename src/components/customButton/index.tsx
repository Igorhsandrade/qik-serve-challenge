import styles from './styles.module.css';

interface IProps {
  buttonLabel: string;
  handleButtonClick: () => void;
}

export const CustomButton = (props: IProps) => {
  return (
    <button className={styles.customButton} onClick={props.handleButtonClick}>
      {props.buttonLabel}
    </button>
  );
};
