import { useAppSelector } from '../../app/hooks';
import SectionItemList from '../../components/sectionItemList';
import styles from './styles.module.css';

const SectionListGroup = () => {
  const sections = useAppSelector((state) => state.menu.menu.sections);

  return (
    <div className={styles.sectionListGroup}>
      {sections.map((section) => (
        <SectionItemList key={section.id} section={section} />
      ))}
    </div>
  );
};

export default SectionListGroup;
