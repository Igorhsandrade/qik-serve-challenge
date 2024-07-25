import styles from './styles.module.css';

interface IProps {
  children: React.ReactNode;
  title: string;
  handleCloseButton: () => void;
}

export const FullScreenMobileComponent = (props: IProps) => {
  return (
    <div className={styles.fullScreenMobileWrapper}>
      <div className={styles.fullScreenMobileContainer}>
        <p className={styles.fullScreenMobileContainerTitle}>{props.title}</p>
        <span
          className={styles.fullScreenMobileContainerCloseButton}
          onClick={props.handleCloseButton}
        ></span>
        {props.children}
      </div>
    </div>
  );
};
