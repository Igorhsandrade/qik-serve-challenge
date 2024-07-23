import { ISection } from '../../interfaces/menu';
import styles from './style.module.css';

interface IProps {
  section: ISection;
  selectedCard: number;
  setSelectedCard: (value: number) => void;
}

const SectionCard = (props: IProps) => {
  return (
    <div
      className={styles.sectionCard}
      onClick={() => props.setSelectedCard(props.section.id)}
    >
      <div className={styles.sectionCardImageContainer}>
        <img
          className={styles.sectionCardImage}
          src={props.section.images[0].image}
        />
      </div>
      <span
        className={`${styles.sectionCardName} ${
          props.selectedCard == props.section.id ? styles.selectedCard : ''
        }`}
      >
        {props.section.name}
      </span>
    </div>
  );
};

export default SectionCard;
