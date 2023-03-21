import {getTranslation} from '@/functions/utility'
import {v4 as uuidv4} from 'uuid'
import styles from './ProductDetailsOptionsSelect.module.scss'
import {getAddonPriceString} from '@/functions/product/productUtil'

/**
 * @param  {object}   props                    Props
 * @param  {number}   props.index              Index
 * @param  {object}   props.variation          Variation
 * @param  {Function} props.handleOptionChange Handle Option Change
 * @param  {object}   props.headlessConfig     Headless config data
   @return {Element}                           The ProductComposite component.
 */
export default function ProductDetailsOptionsSelect({
  index,
  variation,
  handleOptionChange,
  headlessConfig
}) {
  return (
    <div className={styles.selections}>
      <div className={styles.selections__fieldset}>
        <label
          htmlFor={variation?.id}
          className={styles.selections__fieldset__label}
        >
          {variation?.label}
        </label>
        <select
          id={variation?.id}
          className={styles.selections__fieldset__select}
          onChange={(e) =>
            handleOptionChange(
              index,
              e.target.value,
              variation.composite_id,
              variation.product_id,
              variation.options,
              variation.id
            )
          }
          value={variation?.selectedOption}
        >
          <option value="">
            {getTranslation(headlessConfig, 'CHOOSE_AN_OPTION')}
          </option>
          {variation?.options
            ?.filter((o) => !o.notSupported)
            .map((option) => (
              <option value={option.databaseId} key={uuidv4()}>
                {option?.name}{' '}
                {option.price && getAddonPriceString(option.price)}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}
