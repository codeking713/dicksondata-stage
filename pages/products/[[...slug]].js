import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import LayoutNew from '@/components/common/LayoutNew'
import IconProductArrow from '@/components/icons/IconProductArrow'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProductOverviewSkeleton from '@/components/molecules/Product/Skeleton/ProductOverviewSkeleton'
import CategoryMenu from '@/components/organisms/CategoryMenu'
import ProductFilter from '@/components/organisms/ProductFilter'
import ProductList from '@/components/organisms/ProductList'
import ProductSort from '@/components/organisms/ProductSort'
import {
  getLangCode,
  languageRestrictsPerchase
} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import parseQuerystring from '@/functions/parseQuerystring'
import {
  formatProductData,
  formatProductTagsByCategory
} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import getProducts from '@/functions/wordpress/products/getProducts'
import client from '@/lib/next-api/connectorWoo'
import {PRODUCT_CATEGORIES} from '@/lib/wordpress/filters/queryCategories'
import {PRODUCT_TAGS_LIST} from '@/lib/wordpress/filters/queryFilter'
import queryGlobalProductPage from '@/lib/wordpress/pages/queryGlobalProductPage'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {isEmpty} from 'lodash'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styles from './products.module.scss'

// Define route post type.
const postType = 'globalpageconfig'

/**
 * Render the ProductsPage component.
 *
 * @author DAP
 * @param  {object}  props                 The component attributes as props.
 * @param  {Array}   props.productTags     The product tags list
 * @param  {Array}   props.productDataList Category wise products
 * @param  {object}  props.pageConfig      Page configuration
 * @param  {string}  props.slug            Slug
 * @param  {object}  props.post            Post data from WordPress.
 * @return {Element}                       The ProductsPage component.
 */
export default function ProductsPage({
  post,
  productDataList,
  productTags,
  pageConfig,
  slug
}) {
  const {seo} = post
  const [products, setProducts] = useState(formatProductData(productDataList))
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsAppendLoading, setProductsAppendLoading] = useState(false)
  const [productsListNotification, setProductsListNotification] = useState(null)
  const router = useRouter()
  const {headlessConfig} = useWordPressContext()

  const defaultHeight = 72
  const [heightCurrent, setHeightCurrent] = useState(defaultHeight)
  const [heightMax, setHeightMax] = useState(defaultHeight)
  const [heightMin, setHeightMin] = useState(defaultHeight)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    var rc = getRouteBasedDefaultCategory(slug)
    if (rc !== selectedCategory) {
      //This means we need to fetch data
      //Check if the route contains auto param, then we ignore updating the category
      const path = router?.asPath

      const queryForceCategoryUpdate = path.includes('refresh=')
        ? parseQuerystring(path, 'refresh')
        : null

      if (!queryForceCategoryUpdate) {
        setSelectedCategory(rc)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.asPath])

  const getProductTagByTagSlugCategory = (tagSlug, categoryId) => {
    var tag = productTags?.find(
      (pt) => pt.slug === tagSlug && pt.categoryId === categoryId
    )

    return tag
  }

  const getProductTagByTagIdCategory = (tagId, categoryId) => {
    var tag = productTags?.find(
      (pt) => pt.tagId === tagId && pt.categoryId === categoryId
    )

    return tag
  }

  const getRouteBasedDefaultTags = () => {
    let tags = []
    const path = router?.asPath
    const queryTagSlugs = path.includes('tags=')
      ? parseQuerystring(path, 'tags')
      : null

    if (queryTagSlugs !== null) {
      tags = queryTagSlugs.split(',')?.map((t) => {
        var tag = getProductTagByTagSlugCategory(t, selectedCategory)
        if (tag) {
          return {tagId: tag.tagId, categoryId: selectedCategory}
        } else {
          //skip tags which do not belong to the correct category
          return null
        }
      })
    }

    return tags.filter((t) => t !== null)
  }

  const getRouteBasedDefaultCategory = (slug) => {
    if (pageConfig && pageConfig.categories.length > 0) {
      if (slug === null) {
        return pageConfig.categories[0].category.databaseId
      } else {
        var defaultCategoryIndex = pageConfig.categories.findIndex(
          (c) => c.category.slug === slug[0]
        )
        if (defaultCategoryIndex === -1)
          return pageConfig.categories[0].category.databaseId
        else
          return pageConfig.categories[defaultCategoryIndex].category.databaseId
      }
    } else {
      return 0
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(
    getRouteBasedDefaultCategory(slug)
  )

  const [selectedTags, setSelectedTags] = useState(getRouteBasedDefaultTags())
  const [selectedSortOption, setSelectedSortOption] = useState(null)

  const updateFilterQueryRoute = () => {
    //Shallow update URL with the filter query string
    var tagQuery = selectedTags?.map((t) => {
      return getProductTagByTagIdCategory(t.tagId, selectedCategory)?.slug
    })

    var category = getCategoryDetails(selectedCategory)

    if (category) {
      if (tagQuery.filter((t) => t).length > 0) {
        router.push(
          `${category.slug}?tags=${tagQuery
            .filter((t) => t)
            .join(',')}&refresh=1`,
          undefined,
          {
            shallow: true
          }
        )
      } else {
        router.push(`${category.slug}?refresh=1`, undefined, {
          shallow: true
        })
      }
    }
  }

  useEffect(() => {
    invokeFilterProductsAction(null, false, null)
    updateFilterQueryRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, selectedPrice, selectedCategory])

  const invokeFilterProductsAction = async (
    endCursorParam,
    appendProducts,
    sortOption
  ) => {
    if (!selectedCategory || selectedCategory === 0) {
      return
    }

    if (appendProducts) setProductsAppendLoading(true)
    else setProductsLoading(true)

    var lowerPriceRange = 0
    var upperPriceRange = 0

    var selectedCategoryPrice = selectedPrice?.find(
      (p) => p.categoryId === selectedCategory
    )

    if (
      selectedCategoryPrice &&
      selectedCategoryPrice?.price.split('_')?.length === 2
    ) {
      if (selectedCategoryPrice?.price.split('_')[0] !== 0)
        lowerPriceRange = selectedCategoryPrice?.price.split('_')[0]

      if (selectedCategoryPrice?.price.split('_')[1] !== 0)
        upperPriceRange = selectedCategoryPrice?.price.split('_')[1]
    }

    await getProducts(
      selectedCategory,
      selectedTags &&
        selectedTags
          ?.filter((c) => c.categoryId === selectedCategory)
          ?.map((t) => t.tagId),
      lowerPriceRange === '0' ? null : Number(lowerPriceRange),
      upperPriceRange === '0' ? null : Number(upperPriceRange),
      endCursorParam ?? endCursorParam,
      sortOption?.orderBy,
      sortOption?.order,
      getLangCode(router.locale)
    )
      .then((response) => {
        var newProducts = JSON.parse(JSON.stringify(products))
        const index = newProducts.findIndex(
          (d) => d.databaseId === selectedCategory
        )
        if (endCursorParam) {
          response.data.products.nodes.map((value) => {
            newProducts[index].products.push(value)
          })
          newProducts[index].pageInfo = response.data.products.pageInfo
          newProducts[index].sortOption = sortOption
        } else {
          newProducts[index].products = response.data.products.nodes
          newProducts[index].pageInfo = response.data.products.pageInfo
          newProducts[index].sortOption = sortOption
        }
        setProducts(newProducts)
        setProductsLoading(false)
        setProductsAppendLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setProductsListNotification({
          type: 'ERROR',
          message: getTranslation(headlessConfig, 'ERROR_SOMETHING_WENT_WRONG'),
          open: true
        })
        setProductsLoading(false)
        setProductsAppendLoading(false)
      })
  }

  const handleFilterAction = (event, action) => {
    switch (action) {
      case 'PRODUCT_TAG_FILTER':
        handleSelectFilterTag(event)
        break
      case 'PRICE_FILTER':
        handleSelectFilterPrice(event)
        break
      case 'RESET_FILTER':
        handleResetFilter()
        break
      default:
        return null
    }
  }

  const handleSelectFilterTag = (event) => {
    //We need to keep category wise selected product tags

    //1. search for selected tag with tag
    var existingCategoryTag = selectedTags?.find(
      (t) =>
        t.tagId === Number(event?.target?.value) &&
        t.categoryId === selectedCategory
    )

    if (existingCategoryTag) {
      const newTags = selectedTags.filter(
        (p) =>
          !(
            p.tagId === Number(event?.target?.value) &&
            p.categoryId === selectedCategory
          )
      )
      setSelectedTags(newTags)
    } else if (!selectedTags) {
      setSelectedTags([
        {tagId: Number(event?.target?.value), categoryId: selectedCategory}
      ])
    } else {
      setSelectedTags([
        ...selectedTags,
        {tagId: Number(event?.target?.value), categoryId: selectedCategory}
      ])
    }
  }
  const handleResetFilter = () => {
    const newTagFilter = selectedTags?.filter(
      (t) => t.categoryId !== selectedCategory
    )
    const newPriceFilter = selectedPrice?.filter(
      (t) => t.categoryId !== selectedCategory
    )
    setSelectedTags(newTagFilter)
    setSelectedPrice(newPriceFilter)
  }

  const handleSelectFilterPrice = (event) => {
    var exactCategoryPriceFilter = selectedPrice?.find(
      (p) => p.categoryId === selectedCategory
    )

    if (exactCategoryPriceFilter) {
      if (exactCategoryPriceFilter.price === event?.target.value) {
        //User clicked the same checkbox, so we uncheck it now
        const newPriceFilter = selectedPrice?.filter(
          (t) => t.categoryId !== selectedCategory
        )
        setSelectedPrice(newPriceFilter)
      } else {
        //1. remove existing price filter under category
        const newPriceFilter = selectedPrice?.filter(
          (t) => t.categoryId !== selectedCategory
        )

        //2. add new price filter under same category
        newPriceFilter.push({
          price: event?.target.value,
          categoryId: selectedCategory
        })

        setSelectedPrice(newPriceFilter)
      }
    } else if (!selectedPrice || selectedPrice.length === 0) {
      setSelectedPrice([
        {price: event?.target?.value, categoryId: selectedCategory}
      ])
    } else {
      setSelectedPrice([
        ...selectedPrice,
        {price: event?.target.value, categoryId: selectedCategory}
      ])
    }
  }

  const getCategoryDetails = (catId) => {
    let tabItem = products?.find((c) => c.databaseId === Number(catId))
    return tabItem
  }

  const notifyInitTabChange = () => {
    setProductsLoading(true)
  }

  const notifyCompleteTabChange = (category) => {
    if (category) {
      setSelectedCategory(Number(category))
    }
  }

  const handleLoadMoreProducts = () => {
    var category = getCategoryDetails(selectedCategory)

    invokeFilterProductsAction(
      category.pageInfo.endCursor,
      true,
      selectedSortOption
    )
  }

  const handleNotifyError = (notification) => {
    setProductsListNotification(notification)
  }

  const handleSelectSortOption = (sortOption) => {
    var category = getCategoryDetails(selectedCategory)
    if (
      sortOption.orderBy === category?.sortOption?.orderBy &&
      sortOption.order === category?.sortOption?.order
    ) {
      //If the same sort option is sent, we will reset the sort filter
      setSelectedSortOption(null)
      invokeFilterProductsAction(null, false, null)
    } else {
      setSelectedSortOption(sortOption)
      invokeFilterProductsAction(null, false, sortOption)
    }
  }

  useEffect(() => {
    //We need to reset the price filter if the selected language is not the default language
    if (languageRestrictsPerchase) setSelectedPrice(null)
  }, [router.locale])

  useEffect(() => {
    setProducts(formatProductData(productDataList))
    setSelectedCategory(getRouteBasedDefaultCategory(slug))
    setSelectedTags(getRouteBasedDefaultTags())
  }, [pageConfig])

  useEffect(() => {
    const element = document.querySelector('#products-content-description-text')
    const heightClient = element?.clientHeight || defaultHeight
    const scrollClient = element?.scrollHeight || defaultHeight

    if (heightClient !== scrollClient) {
      setIsOverflow(true)
      setHeightMax(scrollClient)
      setHeightMin(heightClient)
      setHeightCurrent(heightClient)
    }
  }, [selectedCategory])

  const onClick = () => {
    setHeightCurrent(isExpanded ? heightMin : heightMax)
    setIsExpanded((prev) => !prev)
  }

  if (router.isFallback) {
    return (
      <LayoutNew seo={{...seo}}>
        <Container>
          <ProductOverviewSkeleton />
        </Container>
      </LayoutNew>
    )
  } else {
    //
    //We need to set the products and selected category again, if there is a delay with get static props.
    if (!products) setProducts(formatProductData(productDataList))
    if (!selectedCategory)
      setSelectedCategory(getRouteBasedDefaultCategory(slug))
  }

  return (
    <LayoutNew seo={{...seo}}>
      <Container>
        {pageConfig ? (
          <div
            className={`${styles['section__checkout__accordion__content__wrapper']} ${styles['grid']} ${styles['gap-md']}`}
          >
            <div className={`${styles.products__filter} ${styles['col-3@md']}`}>
              <div className={styles.products__title}>
                {getTranslation(headlessConfig, 'PRODUCT_CATEGORIES')}{' '}
                <IconProductArrow />
              </div>
              <ProductFilter
                selectedCategory={selectedCategory}
                productTagsList={productTags}
                selectedTags={selectedTags}
                handleFilterAction={handleFilterAction}
                selectedPrice={selectedPrice?.find(
                  (p) => p.categoryId === selectedCategory
                )}
                loading={productsLoading || productsAppendLoading}
                headlessConfig={headlessConfig}
              />
            </div>
            <div className={`${styles['col-9@md']}`}>
              <CategoryMenu
                notifyInitTabChange={notifyInitTabChange}
                notifyCompleteTabChange={notifyCompleteTabChange}
                customClassName={styles.products__content}
                loading={productsLoading || productsAppendLoading}
                defaultSelectedIndex={pageConfig.categories.findIndex(
                  (d) => d.category.databaseId === selectedCategory
                )}
                defaultRef={selectedCategory}
              >
                {pageConfig?.categories?.map((item, index) => {
                  return (
                    <div
                      title={item?.name}
                      key={index}
                      refid={item?.category?.databaseId}
                    >
                      <PageNotifications
                        {...productsListNotification}
                        closeNotification={() =>
                          setProductsListNotification(null)
                        }
                        className={styles.products__content__notification}
                      />
                      <div className={styles.products__content__controls}>
                        <div
                          className={styles.products__content__controls__filter}
                        >
                          <ProductFilter
                            selectedCategory={selectedCategory}
                            productTagsList={productTags}
                            selectedTags={selectedTags}
                            handleFilterAction={handleFilterAction}
                            selectedPrice={selectedPrice?.find(
                              (p) => p.categoryId === selectedCategory
                            )}
                            loading={productsLoading || productsAppendLoading}
                          />
                        </div>
                        <div
                          className={styles.products__content__controls__gap}
                        ></div>
                        <div
                          className={styles.products__content__controls__sort}
                        >
                          <ProductSort
                            sortOption={
                              getCategoryDetails(item?.category?.databaseId)
                                ?.sortOption
                            }
                            handleSelectSortOption={handleSelectSortOption}
                            loading={productsLoading}
                            headlessConfig={headlessConfig}
                          />
                        </div>
                      </div>
                      <ProductList
                        handleSelectSortOption={handleSelectSortOption}
                        category={getCategoryDetails(
                          item?.category?.databaseId
                        )}
                        loading={productsLoading}
                        appendLoading={productsAppendLoading}
                        handleLoadMoreProducts={() => handleLoadMoreProducts()}
                        handleNotifyError={handleNotifyError}
                        handleNotifyLoading={() => setProductsLoading(true)}
                        productOverview={true}
                        headlessConfig={headlessConfig}
                      />
                      {item?.description && (
                        <div
                          className={
                            styles.products__content__description__root
                          }
                        >
                          <div
                            className={`${styles.products__content__description__text}`}
                            id="products-content-description-text"
                            style={{height: `${heightCurrent}px`}}
                            dangerouslySetInnerHTML={{__html: item.description}}
                          ></div>
                          {isOverflow && (
                            <Button
                              size="sm"
                              onClick={onClick}
                              text={isExpanded ? 'Show Less' : 'Show More'}
                              type="primary"
                              className={
                                styles.products__content__description__button
                              }
                            ></Button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CategoryMenu>
            </div>
          </div>
        ) : (
          <PageNotifications
            message="Products Page Not Configured"
            type="ERROR"
            open={true}
          />
        )}
      </Container>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @param  {object} props             Get post static props
 * @param  {any}    props.params      Params
 * @param  {any}    props.params.slug Slug
 * @param  {string} props.locale      Locale
 * @author DAP
 * @return {object}                   Post props.
 */
export async function getStaticProps({params: {slug = null}, locale}) {
  const postData = await getPostTypeStaticProps(
    {slug: 'products'},
    postType,
    false,
    null,
    getLangCode(locale)
  )
  const pageConfig = postData?.props?.globalPageConfig
  if (!pageConfig || !pageConfig.categories)
    return {
      props: {
        post: postData || {}
      }
    }

  const {data: productTagsData} = await client.query({
    query: PRODUCT_TAGS_LIST
  })
  const categories = pageConfig?.categories?.map(
    (obj) => obj.category.databaseId
  )
  const {data: productDataList} = await client.query({
    query: PRODUCT_CATEGORIES,
    variables: {categoryIDs: categories}
  })

  return {
    props: {
      pageConfig: pageConfig || {},
      productDataList: productDataList?.productCategories?.nodes || {},
      tags: productTagsData?.productTags?.nodes,
      productTags:
        formatProductTagsByCategory(productTagsData?.productTags?.nodes) || {},
      ...postData?.props,
      slug
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE)
  }
}

ProductsPage.propTypes = {
  ...getPagePropTypes(postType)
}

/**
 * Get post static paths.
 *
 * @author DAP
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  //Query only the selected categories
  const {data} = await client.query({
    query: queryGlobalProductPage,
    variables: {slug: 'products'}
  })

  const pathsData = []
  pathsData.push({params: {slug: null}})
  //We only need to get the category slugs configured on the products global post type. No need to waste resources by retriving all the product categories.
  data?.globalPageConfigBy?.globalPageConfig?.categories &&
    data.globalPageConfigBy.globalPageConfig.categories.map((cat) => {
      if (!isEmpty(cat?.category?.slug)) {
        pathsData.push({params: {slug: [cat.category?.slug]}})
      }
    })

  return {
    paths: pathsData,
    fallback: true
  }
}
