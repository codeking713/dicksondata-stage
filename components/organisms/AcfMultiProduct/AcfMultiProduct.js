import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import RichText from '@/components/atoms/RichText'
import SectionHead from '@/components/molecules/SectionHead'
import {showRequestQuote} from '@/functions/checkout/commonUtil'
import PropTypes from 'prop-types'
import styles from './AcfMultiProduct.module.scss'

/**
 * Path to product category
 */
const PRODUCT_CATEGORY = '/product/'
/**
 * Render the AcfMultiProduct component.
 *
 * @author DAP
 * @param  {object}  props             AcfMultiProduct component props.
 * @param  {string}  props.title       The heading title
 * @param  {string}  props.description The heading text
 * @param  {Array}   props.products    The Array of products
 * @param  {string}  props.ctaText     Button name
 * @return {Element}                   The AcfMultiProduct component.
 */
export default function AcfMultiProduct({
  title,
  description,
  products,
  ctaText
}) {
  const defPercent = (salePrice, price) =>
    (((salePrice - price) / price) * 100).toFixed(2)

  return (
    <>
      <Container>
        {title && (
          <SectionHead
            heading={title}
            subheading={description}
            alignment="center"
          />
        )}
        <ul className={styles.products}>
          {products?.length > 0 &&
            products.map((product) => {
              let oldPriceRender = null
              let badgeRender = null
              let numPrice = null
              let numSalePrice = null

              if (product?.regularPrice) {
                numPrice = Number.parseInt(product.regularPrice.substr(1))
              }
              if (product?.salePrice) {
                numSalePrice = Number.parseInt(product.salePrice.substr(1))
              }

              // // Render old price block
              if (product?.salePrice && product?.onSale) {
                oldPriceRender = (
                  <p className={styles.product__old_price}>
                    {product?.regularPrice}
                  </p>
                )
              }
              // // Render sale or discount Badge
              if (product?.salePrice && numPrice && numSalePrice) {
                badgeRender = (
                  <Badge
                    className={styles.discount}
                    vol={defPercent(numSalePrice, numPrice)}
                    discount={true}
                  />
                )
              } else {
                badgeRender = null
              }

              return (
                <li key={product.id} className={styles.product}>
                  {product?.imageMeta && (
                    <div className={styles.product__container__image}>
                      <DisplayImage
                        className={styles.product__image}
                        imageMeta={product?.imageMeta}
                      />
                    </div>
                  )}
                  <div className={styles.product__container}>
                    {product?.name && (
                      <h3 className={styles.product__container__heading}>
                        {product.name}
                      </h3>
                    )}
                    {product?.shortDescription ? (
                      <RichText className={styles.product__excerpt} tag="div">
                        {product?.shortDescription}
                      </RichText>
                    ) : (
                      product?.description && (
                        <RichText className={styles.product__excerpt} tag="div">
                          {product?.description}
                        </RichText>
                      )
                    )}
                    <div className={styles.product__footer}>
                      <div className={styles.product__container__price}>
                        {!showRequestQuote(product?.productMeta) && (
                          <>
                            {oldPriceRender}
                            <div className={styles.product__footer__price}>
                              {product.salePrice ? (
                                <p className={styles.product__price}>
                                  {product.salePrice}
                                </p>
                              ) : product.regularPrice ? (
                                <p className={styles.product__price}>
                                  {product.regularPrice}
                                </p>
                              ) : null}
                              {badgeRender}
                            </div>
                          </>
                        )}
                      </div>
                      {product?.slug && (
                        <div className={styles.product__container__button}>
                          <Button
                            className={styles.product__button}
                            url={`${PRODUCT_CATEGORY}${product.slug}`}
                            type="primary"
                            text={ctaText ? ctaText : 'Learn more'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
        </ul>
      </Container>
    </>
  )
}

AcfMultiProduct.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      shortDescription: PropTypes.string,
      regularPrice: PropTypes.string,
      onSale: PropTypes.bool,
      salePrice: PropTypes.string,
      slug: PropTypes.string,
      imageMeta: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      })
    })
  )
}
