import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import PageNotifications from '@/components/molecules/PageNotifications'
import SupportCategorySkeleton from '@/components/molecules/Support/Skeleton/SupportCategorySkeleton'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import Image from 'next/image'
import {useState} from 'react'
import styles from './ProductCategoryGrid.module.scss'
/**
 * Render the ProductCategoryGrid component.
 *
 * @param  {object}   props                    ProductCategoryGrid component props
 * @param  {Array}    props.items              Items
 * @param  {Function} props.itemOnClick        Item OnClick
 * @param  {string}   props.header             Header
 * @param  {number}   props.skeletonTileCount  Skeleton Tile Count
 * @param  {boolean}  props.hasNextPage        Pagination has next page
 * @param  {boolean}  props.appendLoading      Append items in progress
 * @param  {Function} props.handleLoadMoreItem Handle the load more action
 * @param  {boolean}  props.type               Indicate if its a product grid or a category grid
 * @author DAP
 * @return {Element}                           The ProductCategoryGrid component.
 */
export default function ProductCategoryGrid({
  header,
  items,
  itemOnClick,
  skeletonTileCount,
  hasNextPage,
  appendLoading,
  handleLoadMoreItem,
  type
}) {
  const {headlessConfig} = useWordPressContext()
  const [isCategoryLoading, setIsCategoryLoading] = useState(false)
  const onClick = (categorySlug, productSlug) => {
    setIsCategoryLoading(true)
    if (type == 'CATEGORY') {
      itemOnClick(categorySlug)
    } else if (type == 'PRODUCT') {
      itemOnClick(productSlug)
    }
  }
  return (
    <Container className={styles.container}>
      <h4 className={styles.container__heading}>{header}</h4>
      {isCategoryLoading ? (
        <SupportCategorySkeleton
          tileCount={
            items && items.length > 8 ? items.length : skeletonTileCount
          }
        />
      ) : (
        <>
          <div
            className={`${styles['grid']} ${styles['gap-sm']} ${styles['container__grid']} `}
          >
            {items?.length > 0 ? (
              items.map((item, index) => (
                <div
                  onClick={() => onClick(item.category.slug, item.slug)}
                  key={index}
                  className={`${styles.grid__card} ${styles.container__grid} ${styles['col-12@xs']} ${styles['col-5@sm']} ${styles['col-4@md']} ${styles['col-3@lg']}`}
                >
                  <div
                    className={`${styles.card__image} ${
                      !item?.image?.mediaItemUrl &&
                      styles['card__image--placeholder']
                    }`}
                  >
                    {item?.image?.mediaItemUrl && (
                      <Image
                        alt={item?.image?.altText}
                        src={item?.image?.mediaItemUrl}
                        width="350"
                        height="300"
                      />
                    )}
                  </div>
                  <p className={styles.card__title}>{item.name}</p>
                </div>
              ))
            ) : (
              <PageNotifications
                message={getTranslation(
                  headlessConfig,
                  'RECORDS_NOT_AVAILABLE'
                )}
                type="INFO"
                open={true}
              />
            )}
          </div>
          {hasNextPage && (
            <div className={styles.container__more}>
              <Button
                className={styles.container__more__button}
                type="ghost"
                size="sm"
                disabled={appendLoading}
                text={
                  appendLoading
                    ? getTranslation(headlessConfig, 'LOADING')
                    : getTranslation(headlessConfig, 'LOAD_MORE')
                }
                isSubmit={false}
                onClick={async () => handleLoadMoreItem()}
              ></Button>
              {appendLoading && (
                <div className={styles.container__more__skeleton}>
                  <SupportCategorySkeleton tileCount={skeletonTileCount} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

ProductCategoryGrid.defaultProps = {
  handleLoadMoreItem: function () {}
}
