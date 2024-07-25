import { ChangeEvent } from 'react';
import { option, options, select } from '../../constants/appStrings/appStrings';
import { useLocaleData } from '../../hooks/useLocaleData';
import { IModifier } from '../../interfaces/menu';
import styles from './styles.module.css';
import { ISelectedModifiers } from '../../containers/itemModal';

interface IProps {
  itemModifier: IModifier;
  modifierPosition: number;
  setSelectedModifiers: (state: ISelectedModifiers) => void;
  selectedModifiers: ISelectedModifiers;
}

const ItemModifier = (props: IProps) => {
  const { data, isDataLoaded } = useLocaleData();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedSelectedModifiers = { ...props.selectedModifiers };
    updatedSelectedModifiers[props.itemModifier.id] = Object.fromEntries(
      new Map([[`${event.target.value}`, 1]])
    );
    props.setSelectedModifiers(updatedSelectedModifiers);
  };

  return (
    <>
      {isDataLoaded && (
        <div className={styles.itemModifier}>
          <div className={styles.itemModifierDescription}>
            <p>{props.itemModifier.name}</p>
            <span>{`${select} ${props.itemModifier.minChoices} ${
              props.itemModifier.minChoices <= 1 ? option : options
            }`}</span>
          </div>
          <ul>
            {props.itemModifier.items.map((item) => (
              <label key={item.id}>
                <li>
                  <div>
                    <p>{item.name}</p>
                    <span>
                      {item.price.toLocaleString(data?.locale, {
                        style: 'currency',
                        currency: data?.ccy
                      })}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name={`${props.itemModifier.id}`}
                    value={item.id}
                    onChange={(e) => handleChange(e)}
                    checked={
                      props.itemModifier.id in props.selectedModifiers
                        ? item.id in
                          props.selectedModifiers[props.itemModifier.id]
                          ? true
                          : false
                        : false
                    }
                  />
                </li>
              </label>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ItemModifier;
