import Icon from '@/components/atoms/Icon'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {stripHTML} from '@/functions/stringFunctions'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import styles from './ProductInfo.module.scss'

/**
 * Render the ProductInfo component.
 *
 * @param  {object}   props                          ProductInfo component props.
 * @param  {Function} props.handleRemoveProductClick Submit ProductInfo code
 * @param  {object}   props.product                  Product Information
 * @param  {boolean}  props.showImage                Show the product image
 * @param  {boolean}  props.showRemoveProduct        Show the remove product button
 * @param  {string}   props.productHeadingClassName  Style override class name for header section
 * @param  {boolean}  props.disabled                 Disable the remove product button
 * @param  {boolean}  props.showProductDescription   Display the short description
 * @param  {boolean}  props.showQuantity             Display the product quantity on the product info section
 * @param  {boolean}  props.isCompositeChild         Indicate if the current product is a composite products child
 * @return {Element}                                 The ProductInfo component.
 */
export default function ProductInfo({
  product,
  handleRemoveProductClick,
  showImage,
  showRemoveProduct,
  productHeadingClassName,
  disabled,
  showProductDescription,
  showQuantity,
  isCompositeChild
}) {
  const {headlessConfig} = useWordPressContext()

  return product ? (
    <div
      className={`${styles.product} ${
        isCompositeChild && styles['product--compositechild']
      }`}
    >
      {showRemoveProduct && (
        <button
          className={styles.product__delete}
          onClick={(event) => handleRemoveProductClick(event, product.cartKey)}
          disabled={disabled}
        >
          <Icon
            title="Remove"
            icon="bin"
            className={styles.section__button__icon}
          />
        </button>
      )}
      {showImage && (
        <div className={`${styles.product__image}`}>
          {product.image && (
            <DisplayImage
              alt={product.image.alt}
              url={product.image.sourceUrl}
              height={
                product.image?.mediaDetails?.height
                  ? product.image?.mediaDetails?.height
                  : 200
              }
              width={
                product.image?.mediaDetails?.width
                  ? product.image?.mediaDetails?.width
                  : 200
              }
              className={`${styles.product__image__obj} ${
                isCompositeChild &&
                styles['product__image__obj--compositechild']
              }`}
            />
          )}
        </div>
      )}

      <div className={`${styles.product__heading} ${productHeadingClassName}`}>
        {product.sku && (
          <div className={`${styles.product__heading__sku}`}>
            {`${getTranslation(headlessConfig, 'SKU')}: ${product.sku}`}
          </div>
        )}
        {product.name && (
          <span
            dangerouslySetInnerHTML={{
              __html: product.name
            }}
            className={`${styles.product__heading__name}`}
          ></span>
        )}
        {showQuantity && <span> x {product.qty}</span>}

        {product?.addons && (
          <div className={`${styles.product__heading__addons}`}>
            {product?.addons?.map((addon) => (
              <div
                key={addon?.value}
                className={`${styles.product__heading__addons__addon}`}
              >
                {addon?.price ? (
                  addon?.price_type === 'percentage_based' ? (
                    <span
                      className={`${styles.product__heading__addons__addon__name}`}
                    >{`${addon?.name} (${addon?.price}%): `}</span>
                  ) : (
                    <span
                      className={`${styles.product__heading__addons__addon__name}`}
                    >{`${addon?.name} ($${addon?.price}): `}</span>
                  )
                ) : (
                  <span
                    className={`${styles.product__heading__addons__addon__name}`}
                  >{`${addon?.name}: `}</span>
                )}
                {`${addon?.label}`}
              </div>
            ))}
          </div>
        )}
        {showProductDescription &&
          (product.shortDescription ? (
            <RichText className={`${styles.product__heading__description}`}>
              {stripHTML(product.shortDescription)}
            </RichText>
          ) : (
            product.description && (
              <RichText className={`${styles.product__heading__description}`}>
                {stripHTML(product.description)}
              </RichText>
            )
          ))}
      </div>
    </div>
  ) : (
    ''
  )
}

ProductInfo.DefaultProps = {
  showProductDescription: true,
  showQuantity: false
}

ProductInfo.propTypes = {
  product: PropTypes.object,
  handleRemoveProductClick: PropTypes.func,
  showImage: PropTypes.bool,
  showRemoveProduct: PropTypes.bool,
  productHeadingClassName: PropTypes.string,
  disabled: PropTypes.bool,
  showProductDescription: PropTypes.bool,
  showQuantity: PropTypes.bool
}
