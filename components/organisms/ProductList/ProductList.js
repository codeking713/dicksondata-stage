import Button from '@/components/atoms/Button'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProductListSkeleton from '@/components/molecules/ProductList/Skeleton/ProductListSkeleton'
import {prepareTagManagerDataLayerObj} from '@/functions/checkout/commonUtil'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import {useEffect} from 'react'
import TagManager from 'react-gtm-module'
import ProductCard from '../ProductCard'
import styles from './ProductList.module.scss'
/**
 * Render the ProductList component.
 *
 * @author DAP
 * @param  {object}   props                        ProductList component props.
 * @param  {boolean}  props.loading                Indicate if the products are loading
 * @param  {Function} props.handleLoadMoreProducts Handle load more products
 * @param  {Function} props.handleNotifyError      Handle Notify Error
 * @param  {boolean}  props.appendLoading          Append products to existing list
 * @param  {Function} props.handleNotifyLoading    Handle loading state
 * @param  {boolean}  props.productOverview        Indicate if its the product overview page
 * @param  {object}   props.headlessConfig         Headless config
 * @param  {object}   props.category               Category with products
 * @return {Element}                               The ProductList component.
 */
export default function ProductList({
  category,
  loading,
  appendLoading,
  handleLoadMoreProducts,
  handleNotifyError,
  handleNotifyLoading,
  productOverview,
  headlessConfig
}) {
  useEffect(() => {
    if (category?.products && category?.products.length > 0) {
      TagManager.dataLayer({
        dataLayer: {ecommerce: null}
      })
      TagManager.dataLayer({
        dataLayer: prepareTagManagerDataLayerObj(
          category?.products,
          'view_item_list',
          null,
          null,
          null,
          category
        )
      })
    }
  }, [category?.products])

  return (
    <>
      {loading ? (
        <ProductListSkeleton placeholderCount={9} />
      ) : (
        <>
          {category?.products?.length ? (
            <>
              <div className={styles.container}>
                {category?.products.map((product, index) => (
                  <div key={`$product-${index}`}>
                    <ProductCard
                      product={product}
                      category={category.name}
                      handleNotifyError={handleNotifyError}
                      handleNotifyLoading={handleNotifyLoading}
                      productOverview={productOverview}
                    />
                  </div>
                ))}
              </div>
              {category?.pageInfo?.hasNextPage && (
                <div className={styles.more}>
                  <Button
                    className={styles.more__button}
                    type="ghost"
                    size="sm"
                    disabled={appendLoading}
                    text={
                      appendLoading
                        ? getTranslation(headlessConfig, 'LOADING')
                        : getTranslation(headlessConfig, 'LOAD_MORE')
                    }
                    isSubmit={false}
                    onClick={() => handleLoadMoreProducts()}
                  ></Button>
                </div>
              )}
            </>
          ) : (
            <PageNotifications
              message={getTranslation(headlessConfig, 'RECORDS_NOT_AVAILABLE')}
              type="INFO"
              open={true}
            />
          )}
          {appendLoading && (
            <div className={styles.skeleton}>
              <ProductListSkeleton placeholderCount={9} />
            </div>
          )}
        </>
      )}
    </>
  )
}

ProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      shortDescription: PropTypes.string,
      categoryName: PropTypes.string,
      topBadgeTxt: PropTypes.string,
      slug: PropTypes.string,
      className: PropTypes.string,
      salePrice: PropTypes.string,
      regularPrice: PropTypes.string,
      image: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          width: PropTypes.number
        })
      })
    })
  )
}
