import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import SectionHead from '@/components/molecules/SectionHead'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import React, {useRef, useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import styles from './AcfProductMatrix.module.scss'
/**
   /**
 * Render the AcfProductMatrix component.
 *
 * @param  {object}  props          AcfProductMatrix component props.
 * @param  {string}  props.heading  The heading.
 * @param  {string}  props.copy     The copy text.
 * @param  {Array}   props.products The stats for the section.
 * @param  {string}  props.footnote The footer note
 * @return {Element}                The AcfProductMatrix component.
 */
export default function AcfProductMatrix({heading, copy, products, footnote}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const {headlessConfig} = useWordPressContext()
  const productHeaderData = [
    {
      id: 1,
      header: getTranslation(headlessConfig, 'REPLACEABLE_SENSOR_PORTS'),
      contentKey: 'ports',
      icon: 'refresh_alt'
    },
    {
      id: 2,
      header: getTranslation(headlessConfig, 'COMMUNICATION'),
      contentKey: 'communication',
      icon: 'chat_v2'
    },
    {
      id: 3,
      header: getTranslation(headlessConfig, 'POWER_SOURCE'),
      contentKey: 'power',
      icon: 'power'
    },
    {
      id: 4,
      header: getTranslation(headlessConfig, 'BATTERY_BACKUP'),
      contentKey: 'battery',
      icon: 'battery_v2'
    },
    {
      id: 5,
      header: getTranslation(headlessConfig, 'STORAGE'),
      contentKey: 'storage',
      icon: 'server'
    },
    {
      id: 6,
      header: getTranslation(headlessConfig, 'OTA_FIRMWARE_UPDATES'),
      contentKey: 'updates',
      icon: 'refresh'
    },
    {
      id: 7,
      header: getTranslation(headlessConfig, 'DISPLAY'),
      contentKey: 'display',
      icon: 'computer'
    },
    {
      id: 8,
      header: getTranslation(headlessConfig, 'NETWORK_SETUP'),
      contentKey: 'network',
      icon: 'gear'
    },
    {
      id: 9,
      header: getTranslation(headlessConfig, 'DIMENTIONS'),
      contentKey: 'dimensions',
      icon: 'expand'
    }
  ]

  const settings = {
    dots: true,
    dotsClass: `slick-dots  ${styles['section__slick__dots']}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setTimeout(function () {
        setActiveIndex(next)
      }, 500)
    },
    appendDots: (dots) => {
      return (
        <div>
          <ul>
            {dots.map((item, index) => {
              return <li key={index}>{item.props.children}</li>
            })}
          </ul>
        </div>
      )
    },
    customPaging: (index) => {
      return (
        <button
          className={`${
            index == activeIndex
              ? styles['section__slick__dots__dot--active']
              : styles['section__slick__dots__dot']
          }`}
        >
          {index + 1}
        </button>
      )
    }
  }

  const sliderRef = useRef()

  const renderTableFooterCTA = (product) => {
    return (
      product?.link?.url && (
        <Button
          className={styles.section__table__row__cel__link}
          url={product?.link?.url}
          text={`${getTranslation(headlessConfig, 'VIEW')} ${product.name}`}
          type="ghost"
          size="sm"
        />
      )
    )
  }
  const renderTableHeader = (product) => {
    return (
      <>
        {product.isTopSelling == 1 && (
          <Badge
            className={styles.section__table__row__cel__topselling}
            vol={getTranslation(headlessConfig, 'TOP_SELLING')}
            smallSize={true}
          />
        )}
        <DisplayImage
          alt={product.imageMeta?.altText}
          url={product.imageMeta?.mediaItemUrl}
          imageMeta={product.imageMeta}
          nextImageFill={true}
          className={styles.section__table__row__cel__image}
        />
        <div className={styles.section__table__row__cel__name}>
          {product.name}
        </div>
        <div className={styles.section__table__row__cel__price}>
          {product.price}
        </div>
      </>
    )
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead heading={heading} subheading={copy} alignment="center" />
        {products &&
          products.length > 0 &&
          productHeaderData &&
          productHeaderData.length > 0 && (
            <>
              <div className={styles['section__table__row--mobile']}>
                <Slider ref={sliderRef} {...settings}>
                  {products.map((product, index) => (
                    <div key={`${index}--row--mobile`}>
                      {renderTableHeader(product)}
                    </div>
                  ))}
                </Slider>
              </div>
              <div className={styles.section__table}>
                <table>
                  <tbody>
                    <tr
                      className={`${styles.section__table__row} ${styles['section__table__row--desktop']}`}
                    >
                      <th></th>
                      {products.map((product, index) => (
                        <th
                          key={`${index}--row--first`}
                          className={`${styles.section__table__row__cel} ${styles['section__table__row__cel--desktop']}`}
                          scope="col"
                        >
                          {renderTableHeader(product)}
                        </th>
                      ))}
                    </tr>
                    {productHeaderData.map((productHeader, index) => (
                      <tr
                        key={`${index}--row--content`}
                        className={styles.section__table__row}
                      >
                        <th
                          scope="row"
                          className={`${styles.section__table__row__cel} ${styles['section__table__row__cel--left']}`}
                        >
                          <Icon
                            title={productHeader.icon}
                            icon={productHeader.icon}
                            className={styles.section__table__row__cel__icon}
                          />
                          <span
                            className={styles.section__table__row__cel__label}
                          >
                            {productHeader.header}
                          </span>
                        </th>
                        {products.map((product, index) => (
                          <td
                            key={index}
                            className={`${styles.section__table__row__cel} ${
                              activeIndex == index &&
                              styles['section__table__row__cel--active']
                            }`}
                          >
                            {products[index][productHeader.contentKey]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr
                      className={`${styles.section__table__row} ${styles['section__table__row--desktop']}`}
                    >
                      <td className={styles.section__product__header}></td>
                      {products.map((product, index) => (
                        <td
                          key={`${index}--row--last--desktop`}
                          className={`${styles.section__table__row__cel} ${styles['section__table__row__cel--desktop']}`}
                        >
                          {renderTableFooterCTA(product)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles['section__table__row--mobile']}>
                {products.map((product, index) => (
                  <div
                    key={`${index}--row--last--mobile`}
                    className={`${styles.section__table__row__cel} ${
                      styles['section__table__row__footer--mobile']
                    } ${
                      activeIndex == index
                        ? styles['section__table__row__footer--active']
                        : ''
                    }`}
                  >
                    {renderTableFooterCTA(product)}
                  </div>
                ))}
              </div>
            </>
          )}
        <div className={styles.section__footer}>
          <RichText>{footnote}</RichText>
        </div>
      </Container>
    </section>
  )
}

AcfProductMatrix.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  footnote: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
      imageMeta: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      }),
      link: PropTypes.oneOfType([
        PropTypes.shape({
          target: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string
        }),
        PropTypes.string
      ]),
      ports: PropTypes.string,
      communication: PropTypes.string,
      power: PropTypes.string,
      battery: PropTypes.string,
      storage: PropTypes.string,
      updates: PropTypes.string,
      display: PropTypes.string,
      network: PropTypes.string,
      dimensions: PropTypes.string
    })
  )
}

AcfProductMatrix.defaultProps = {}
