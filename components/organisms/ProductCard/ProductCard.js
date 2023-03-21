import Badge from '@/components/atoms/Badge'
import DisplayImage from '@/components/atoms/Image/Image'
import AddToCartButton from '@/components/molecules/Checkout/AddToCartButton'
import ProductPrice from '@/components/molecules/ProductPrice'
import {
  languageRestrictsPerchase,
  resolvePrice,
  resolveRegularPrice,
  showRequestQuote
} from '@/functions/checkout/commonUtil'
import {stripHTML} from '@/functions/stringFunctions'
import {getTranslation} from '@/functions/utility'
import cn from 'classnames'
import {useWordPressContext} from 'components/common/WordPressProvider'
import Link from 'next/link'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import styles from './ProductCard.module.scss'

/**
 * Render the Product Card component.
 *
 * @param  {object}   props                     Product Card component props.
 * @param  {object}   props.product             Product object
 * @param  {string}   props.className           Style override class
 * @param  {string}   props.category            Product category
 * @param  {Function} props.handleNotifyError   Handle Notify Error
 * @param  {Function} props.handleNotifyLoading Handle Notify Loading State
 * @param  {boolean}  props.productOverview     Indicate if its the product overview page
 * @author DAP
 * @return {Element}                            The ProductCard component.
 */
export default function ProductCard({
  product,
  className,
  category,
  handleNotifyError,
  handleNotifyLoading,
  productOverview
}) {
  const {headlessConfig} = useWordPressContext()
  const {push, locale, defaultLocale} = useRouter()

  const isRestrictsPerchase =
    languageRestrictsPerchase(defaultLocale, locale) ||
    showRequestQuote(product?.productMeta)
  const openProductDetail = (event) => {
    event.stopPropagation()
    //We will look for the productcardaction data attribute on the target or its parent and skip the route to product detail page
    if (
      event.target?.dataset?.productcardaction === 'true' ||
      event.target?.parentElement?.dataset?.productcardaction === 'true'
    )
      return
    if (handleNotifyLoading) handleNotifyLoading(true)

    if (locale === 'fr-fr') push(`/produit/${product?.slug}`)
    else push(`/product/${product?.slug}`)
  }

  return (
    <>
      <div
        onClick={(event) => openProductDetail(event)}
        className={cn(styles.card, className)}
      >
        <div className={styles.card__image}>
          {product.salePrice && (
            <Badge
              vol={
                product.salePrice
                  ? getTranslation(headlessConfig, 'ON_SALE')
                  : null
              }
              className={styles.card__image__badge}
            />
          )}
          <Link href="javascript:void(0)">
            <a alt={product.name} title={product.name}>
              {product.image ? (
                <DisplayImage
                  className={styles.card__image__obj}
                  url={product.image?.mediaItemUrl}
                  height={
                    product.image?.mediaDetails?.height
                      ? product.image?.mediaDetails?.height
                      : 240
                  }
                  width={
                    product.image?.mediaDetails?.width
                      ? product.image?.mediaDetails?.width
                      : 240
                  }
                  alt={product.image.altText ? product.image.altText : ''}
                />
              ) : (
                <DisplayImage
                  className={`${styles.card__image__obj} ${styles['card__image__obj--placeholder']}`}
                  url={`${process.env.FRONTEND_URL}images/product-placeholder.svg`}
                  height={240}
                  width={240}
                  alt="Image Unavailable"
                  nextImageFill={true}
                />
              )}
            </a>
          </Link>
        </div>
        <div className={styles.card__content}>
          {category && (
            <div className={styles.card__content__category}>{category}</div>
          )}
          {product.name && (
            <Link href="javascript:void(0)">
              <a
                className={styles.decoration__none}
                alt={product.name}
                title={product.name}
              >
                <h3 className={styles.card__content__title}>{product.name}</h3>
              </a>
            </Link>
          )}
          {product.shortDescription !== '' ? (
            <div className={styles.card__content__description}>
              {stripHTML(product.shortDescription)}
            </div>
          ) : (
            product.description && (
              <div className={styles.card__content__description}>
                {stripHTML(product.description)}
              </div>
            )
          )}
        </div>
        <div className={styles.card__footer}>
          {!isRestrictsPerchase && (
            <ProductPrice
              price={resolvePrice(product, false)}
              priceRaw={resolvePrice(product, true)}
              regularPrice={resolveRegularPrice(product, false)}
              regularPriceRaw={resolveRegularPrice(product, true)}
              onSale={product.onSale}
              className={styles.card__footer__price}
              type={product.type}
              headlessConfig={headlessConfig}
            />
          )}
          <AddToCartButton
            className={styles.card__button}
            type="primary"
            product={product}
            handleNotifyError={handleNotifyError}
            addToCardVariableProduct={false}
            productOverview={productOverview}
            totalAmount={resolvePrice(product, false)}
          />
        </div>
      </div>
    </>
  )
}

ProductCard.propTypes = {
  key: PropTypes.string,
  className: PropTypes.string,
  product: PropTypes.object
}
