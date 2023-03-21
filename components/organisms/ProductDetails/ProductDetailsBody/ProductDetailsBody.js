import RichText from '@/components/atoms/RichText'
import {getTranslation} from '@/functions/utility'
import classNames from 'classnames'
import styles from './ProductDetailsBody.module.scss'

const ProductDetailsBody = ({
  product,
  className,
  scrollToElement,
  isDiscontinued,
  isOutOfStock,
  headlessConfig,
  showPrice
}) => {
  const bodyClassnames = classNames(className, styles.body)
  return (
    <div className={bodyClassnames}>
      {product?.name && <h1 className={styles.body__title}>{product?.name}</h1>}
      {product?.sku && (
        <div className={styles.body__sku}>
          <span className={styles.body__sku__name}>
            {getTranslation(headlessConfig, 'SKU')}:
          </span>
          <span className={styles.body__sku__value}>{product?.sku}</span>
        </div>
      )}

      {showPrice && !isDiscontinued && (
        <div className={styles.body__price}>
          {(product?.type == 'SIMPLE' || product?.type == 'VARIABLE') && (
            <>
              {product?.onSale && (
                <span
                  className={`${styles.body__price__text} ${styles['body__price__text--regular']}`}
                >
                  {product.regularPrice}
                </span>
              )}
              <div className={styles.body__price__value}>{product?.price}</div>
            </>
          )}
          {(product?.type == 'BUNDLE' || product?.type == 'COMPOSITE') && (
            <>
              <div className={styles.body__price__text}>
                <span>{getTranslation(headlessConfig, 'STARTING_FROM')} </span>
                {product?.onSale && (
                  <span className={`${styles['body__price__text--regular']}`}>
                    {product.regularPrice
                      ? product.regularPrice
                      : product.childrenRegularPrice}
                  </span>
                )}
              </div>
              <div className={styles.body__price__value}>
                {product?.price ? product?.price : product?.childrenPrice}
              </div>
            </>
          )}
        </div>
      )}
      {product?.description && (
        <RichText className={styles.body__desc}>
          {product?.description}
        </RichText>
      )}
      {isDiscontinued && (
        <div className={styles.body__discontinued}>
          {getTranslation(headlessConfig, 'NO_LONGER_AVAILABLE')}
        </div>
      )}
      {isOutOfStock && (
        <div className={styles.body__discontinued}>
          {getTranslation(headlessConfig, 'OUT_OF_STOCK')}
        </div>
      )}
      <button
        onClick={() => scrollToElement()}
        className={styles.body__more}
        id="btnGoToDetails"
      >
        {getTranslation(headlessConfig, 'SEE_ALL_DETAILS')}
      </button>
    </div>
  )
}

ProductDetailsBody.defaultProps = {}

export default ProductDetailsBody
