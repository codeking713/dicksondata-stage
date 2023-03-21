import RichText from '@/components/atoms/RichText'
import {getTranslation} from '@/functions/utility'
import classNames from 'classnames'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import styles from './ProductDetailsTabs.module.scss'

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const ProductDetailsTabsDesktopBtn = ({
  index,
  activeTabIndex,
  heading,
  onClickHandler
}) => {
  const tabMobileClassnames = classNames(styles.tabs__dtabs__tab, {
    [styles['tabs__dtabs__tab--active']]: index === activeTabIndex
  })

  return (
    <button
      className={tabMobileClassnames}
      id={`ddBtn${heading}`}
      aria-controls={`ddTab${heading}`}
      onClick={onClickHandler}
    >
      {heading}
    </button>
  )
}

const ProductDetailsTabsBody = ({index, activeTabIndex, heading, children}) => {
  const [isToggled, setIsToggled] = useState(true)

  const handleTabClick = () => {
    setIsToggled(!isToggled)
  }

  const tabBodyClassnames = classNames(styles.tabs__tabcontents__content, {
    [styles['tabs__tabcontents__content--active']]: index === activeTabIndex,
    [styles['tabs__tabcontents__content--toggled']]: isToggled
  })

  return (
    <div className={tabBodyClassnames}>
      <button
        className={styles.tabs__tabcontents__content__toggle}
        aria-controls={`ddTab${heading}`}
        onClick={handleTabClick}
      >
        <span className={styles.tabs__tabcontents__content__toggle__text}>
          {heading}
        </span>
        <span
          className={styles.tabs__tabcontents__content__toggle__chevron}
        ></span>
      </button>
      <div
        className={styles.tabs__tabcontents__content__main}
        id={`ddTab${heading}`}
        aria-hidden={index === activeTabIndex}
      >
        <div className={styles.tabs__tabcontents__content__main__wrapper}>
          {children}
        </div>
      </div>
    </div>
  )
}

const ProductDetailsTabsBodyContents = ({
  tabName,
  productName,
  articles,
  manuals,
  support,
  contents,
  headlessConfig
}) => {
  switch (tabName) {
    case getTranslation(headlessConfig, 'OVERVIEW'):
      return (
        <ProductDetailsTabsBodyOverview
          contents={contents?.productOverviewTab}
        />
      )
    case getTranslation(headlessConfig, 'SPECIFICATIONS'):
      return (
        <ProductDetailsTabsBodySpecifications
          productName={productName}
          contents={contents?.productSpecsTab}
          headlessConfig={headlessConfig}
        />
      )
    case getTranslation(headlessConfig, 'MANUALS'):
      return (
        <ProductDetailsTabsBodyManuals
          productName={productName}
          contents={contents?.productManualsTab}
          articles={articles}
          manuals={manuals}
          headlessConfig={headlessConfig}
        />
      )
    case getTranslation(headlessConfig, 'SUPPORT'):
      return (
        <ProductDetailsTabsBodySupport
          contents={contents?.productSupportTab}
          support={support}
        />
      )
  }
}

const ProductDetailsTabsBodyOverview = ({contents}) => (
  <>{contents && <RichText>{contents}</RichText>}</>
)

const ProductDetailsTabsBodySpecifications = ({
  contents,
  productName,
  headlessConfig
}) => {
  const columnArray = []

  const contentsTableColumnHasData = () => {
    const columnAmount = 6

    const loop = [...Array(columnAmount)].forEach((_, index) => {
      const rowNumber = index + 1

      if (contents.some((e) => e[`column${rowNumber}`] !== null)) {
        columnArray.push(true)
      } else {
        columnArray.push(false)
      }
    })

    loop
  }

  contentsTableColumnHasData()

  return (
    <>
      <div
        className={styles.tabs__tabcontents__content__main__wrapper__heading}
      >
        {productName && `${productName} `}
        {getTranslation(headlessConfig, 'SPECIFICATIONS')}
      </div>
      {contents?.length > 0 && (
        <table
          className={styles.tabs__tabcontents__content__main__wrapper__table}
        >
          <tbody>
            {contents?.map((row) => (
              <tr key={uuidv4()}>
                {columnArray[0] && <RichText tag="td">{row?.column1}</RichText>}
                {columnArray[1] && <RichText tag="td">{row?.column2}</RichText>}
                {columnArray[2] && <RichText tag="td">{row?.column3}</RichText>}
                {columnArray[3] && <RichText tag="td">{row?.column4}</RichText>}
                {columnArray[4] && <RichText tag="td">{row?.column5}</RichText>}
                {columnArray[5] && <RichText tag="td">{row?.column6}</RichText>}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
const ProductDetailsTabsBodyManuals = ({
  contents,
  manuals,
  articles,
  headlessConfig
}) => (
  <>
    {contents && (
      <div className={styles.tabs__tabcontents__content__main__wrapper__copy}>
        <RichText>{contents}</RichText>
      </div>
    )}
    <div className={styles.tabs__tabcontents__content__main__wrapper__twocol}>
      {manuals?.length > 0 && (
        <div
          className={
            styles.tabs__tabcontents__content__main__wrapper__twocol__col
          }
        >
          <div
            className={
              styles.tabs__tabcontents__content__main__wrapper__twocol__col__heading
            }
          >
            {getTranslation(headlessConfig, 'DOWNLOAD_MANUALS')}
          </div>
          {manuals.map((manual) => (
            <div
              className={
                styles.tabs__tabcontents__content__main__wrapper__twocol__col__doc
              }
              key={uuidv4()}
            >
              <a
                href={manual?.support_manual_options?.manualFile?.mediaItemUrl}
                className={
                  styles.tabs__tabcontents__content__main__wrapper__twocol__col__doc__link
                }
                download
              >
                {manual?.title}
              </a>
              <div
                className={
                  styles.tabs__tabcontents__content__main__wrapper__twocol__col__doc__info
                }
              >
                ({manual?.support_manual_options?.manualFile?.mimeType},{' '}
                {formatBytes(
                  manual?.support_manual_options?.manualFile?.fileSize
                )}
                )
              </div>
            </div>
          ))}
        </div>
      )}
      {articles?.length > 0 && (
        <div
          className={
            styles.tabs__tabcontents__content__main__wrapper__twocol__col
          }
        >
          <div
            className={
              styles.tabs__tabcontents__content__main__wrapper__twocol__col__heading
            }
          >
            {getTranslation(headlessConfig, 'RELATED_ARTICLES')}
          </div>
          {articles.map((article) => (
            <a
              href={article?.uri}
              className={
                styles.tabs__tabcontents__content__main__wrapper__twocol__col__link
              }
              key={uuidv4()}
            >
              {article?.title}
            </a>
          ))}
        </div>
      )}
    </div>
  </>
)

const ProductDetailsTabsBodySupport = ({contents, support}) => {
  const OpenChat = () => {
    window?.SnapEngage?.startLink()
  }

  const transformLink = (linkType) => {
    let link = ''

    switch (linkType) {
      case 'tel':
        link = 'tel:'
        break
      case 'email':
        link = 'mailto:'
        break
      case 'chat':
        link = 'OPENCHAT'
        break
    }

    return link
  }

  return (
    <>
      {support?.items?.length > 0 && (
        <div
          className={
            styles.tabs__tabcontents__content__main__wrapper__supportcta
          }
        >
          {support.items.map((contact) => {
            return (
              <a
                href={
                  transformLink(contact?.linkType) === 'OPENCHAT'
                    ? '#'
                    : `${transformLink(contact?.linkType)}${contact?.link}`
                }
                className={
                  styles.tabs__tabcontents__content__main__wrapper__supportcta__cta
                }
                onClick={
                  transformLink(contact?.linkType) === 'OPENCHAT'
                    ? OpenChat
                    : null
                }
                key={uuidv4()}
              >
                <div
                  className={
                    styles.tabs__tabcontents__content__main__wrapper__supportcta__cta__icon
                  }
                >
                  <img
                    src={contact?.image?.mediaItemUrl}
                    alt={contact?.image?.altText}
                  />
                </div>
                <span
                  className={
                    styles.tabs__tabcontents__content__main__wrapper__supportcta__cta__title
                  }
                >
                  {contact?.link}
                </span>
              </a>
            )
          })}
        </div>
      )}
      {(contents || support?.description) && (
        <div className={styles.tabs__tabcontents__content__main__wrapper__copy}>
          {support?.description && !contents && (
            <RichText>{support?.description}</RichText>
          )}
          <RichText>{contents}</RichText>
        </div>
      )}
    </>
  )
}

const ProductDetailsTabs = ({
  productName,
  productSupportArtifacts,
  tabData,
  support,
  className,
  headlessConfig
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleTabClick = (index) => {
    setActiveTabIndex(index)
  }

  const tabsClassnames = classNames(className, styles.tabs)

  const supportArticles = () => {
    if (productSupportArtifacts?.length > 0) {
      return productSupportArtifacts.filter(
        (entry) => entry.contentTypeName === 'support_articles'
      )
    } else {
      return []
    }
  }

  const supportManuals = () => {
    if (productSupportArtifacts?.length > 0) {
      return productSupportArtifacts.filter(
        (entry) => entry.contentTypeName === 'support_manuals'
      )
    } else {
      return []
    }
  }

  const constuctTabs = () => {
    let tabsArray = []

    if (tabData?.productOverviewTab) {
      tabsArray.push({
        name: getTranslation(headlessConfig, 'OVERVIEW')
      })
    }

    if (tabData?.productSpecsTab) {
      tabsArray.push({name: getTranslation(headlessConfig, 'SPECIFICATIONS')})
    }

    if (supportArticles()?.length > 0 || supportManuals()?.length > 0) {
      tabsArray.push({name: getTranslation(headlessConfig, 'MANUALS')})
    }

    tabsArray.push({name: getTranslation(headlessConfig, 'SUPPORT')})

    return tabsArray
  }

  return (
    <section className={tabsClassnames}>
      <div className={styles.tabs__heading}>
        {getTranslation(headlessConfig, 'PRODUCT_DETAILS')}
      </div>
      <div className={styles.tabs__dtabs}>
        {constuctTabs()?.map((tab, index) => (
          <ProductDetailsTabsDesktopBtn
            key={uuidv4()}
            index={index}
            activeTabIndex={activeTabIndex}
            heading={tab?.name}
            onClickHandler={() => handleTabClick(index)}
          />
        ))}
      </div>
      <div className={styles.tabs__tabcontents}>
        {constuctTabs()?.map((tab, index) => (
          <ProductDetailsTabsBody
            key={uuidv4()}
            index={index}
            activeTabIndex={activeTabIndex}
            heading={tab.name}
          >
            <ProductDetailsTabsBodyContents
              tabName={tab.name}
              productName={productName}
              articles={supportArticles()}
              manuals={supportManuals()}
              support={support}
              contents={tabData}
              headlessConfig={headlessConfig}
            />
          </ProductDetailsTabsBody>
        ))}
      </div>
    </section>
  )
}

export default ProductDetailsTabs
