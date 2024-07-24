import { option, options, select } from '../../constants/appStrings/appStrings';
import { IModifier } from '../../interfaces/menu';
import styles from './styles.module.css';

interface IProps {
  itemModifier: IModifier;
}

const ItemModifier = (props: IProps) => {
  return (
    <div className={styles.itemModifier}>
      <div className={styles.itemModifierDescription}>
        <p>{props.itemModifier.name}</p>
        <span>{`${select} ${props.itemModifier.minChoices} ${
          props.itemModifier.minChoices <= 1 ? option : options
        }`}</span>
      </div>
      <ul>
        {props.itemModifier.items.map((item) => (
          <label>
            <li>
              <div>
                <p>{item.name}</p>
                <span>
                  {item.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
              <input type="radio" name={`${props.itemModifier.id}`} />
            </li>
          </label>
        ))}
      </ul>
    </div>
  );
};

export default ItemModifier;
