import { ISection } from '../../interfaces/menu';
import styles from './style.module.css';
import SectionCard from '../../components/sectionCard';

interface IProps {
  sectionList: ISection[];
  selectedSection: number;
  setSelectedSection: (value: number) => void;
}

const SectionIcons = (props: IProps) => {
  return (
    <div className={styles.sectionIconsContainer}>
      {props.sectionList.map((section) => (
        <SectionCard
          section={section}
          selectedCard={props.selectedSection}
          setSelectedCard={props.setSelectedSection}
        />
      ))}
    </div>
  );
};

export default SectionIcons;
