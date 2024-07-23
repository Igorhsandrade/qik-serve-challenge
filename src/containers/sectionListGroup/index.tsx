import SectionItemList from '../../components/sectionItemList';
import { ISection } from '../../interfaces/menu';
import styles from './styles.module.css';

interface IProps {
  sections: ISection[];
}

const SectionListGroup = (props: IProps) => {
  return (
    <div className={styles.sectionListGroup}>
      {props.sections.map((section) => (
        <SectionItemList section={section} />
      ))}
    </div>
  );
};

export default SectionListGroup;
