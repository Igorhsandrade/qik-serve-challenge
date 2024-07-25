import { option, options, select } from '../../constants/appStrings/appStrings';
import { useLocaleData } from '../../hooks/useLocaleData';
import { IModifier } from '../../interfaces/menu';
import styles from './styles.module.css';

interface IProps {
  itemModifier: IModifier;
}

const ItemModifier = (props: IProps) => {
  const { data, isDataLoaded } = useLocaleData();

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
                  <input type="radio" name={`${props.itemModifier.id}`} />
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
