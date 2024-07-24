import styles from './style.module.css';
import SectionCard from '../../components/sectionCard';
import { useAppSelector } from '../../app/hooks';

interface IProps {
  selectedSection: number;
  setSelectedSection: (value: number) => void;
}

const SectionIcons = (props: IProps) => {
  const sections = useAppSelector((state) => state.menu.menu.sections);

  return (
    <div className={styles.sectionIconsContainer}>
      {sections.map((section) => (
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
