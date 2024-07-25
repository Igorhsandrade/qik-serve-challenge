import styles from './styles.module.css';
interface IProps {
  children: React.ReactNode;
  isShowingModal: boolean;
  handleCloseModal: () => void;
}
export const GenericModal = (props: IProps) => {
  return (
    <>
      {props.isShowingModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <span
              className={styles.modalCloseButton}
              onClick={props.handleCloseModal}
            ></span>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};
