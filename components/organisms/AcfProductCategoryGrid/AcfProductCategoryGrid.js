import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import styles from './AcfProductCategoryGrid.module.scss'
/**
 * Render the AcfProductCategoryGrid component.
 *
 * @author DAP
 * @param  {object}  props       AcfProductCategoryGrid component props.
 * @param  {Array}   props.items The items for the component.
 * @return {Element}             The AcfProductCategoryGrid component.
 */
export default function AcfProductCategoryGrid({items}) {
  const {headlessConfig} = useWordPressContext()
  return (
    <Container className={styles.container}>
      <h4 className={styles.container__heading}>
        {getTranslation(headlessConfig, 'SELECT_CATEGORY')}
      </h4>
      <div className={styles.container__grid}>
        {items &&
          items.map((item, index) => (
            <div key={index} className={styles.grid__card}>
              <div className={styles.card__image}>
                <DisplayImage
                  alt={item?.imageMeta?.altText}
                  url={item?.imageMeta?.mediaItemUrl}
                  imageMeta={item?.imageMeta}
                  nextImageFill={true}
                />
              </div>
              <p className={styles.card__title}>{item.text}</p>
            </div>
          ))}
      </div>
    </Container>
  )
}
