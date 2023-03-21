import Container from '@/components/atoms/Container'
import RichText from '@/components/atoms/RichText'
import IconChevron from '@/components/icons/chevron'
import IconQuotes from '@/components/icons/quotes'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfQuotes.module.scss'

export const acfQuotesFragment = `
  fragment AcfQuotesFragment on AcfAcfQuotes {
    acfFields {
      sectionHeading
      items {
        body
        description
        name
      }
    }
  }
`

/**
 * @param  {object}   props           CustomNextArrow props
 * @param  {string}   props.className The classname
 * @param  {string}   props.style     The style
 * @param  {Function} props.onClick   The onClick function.
 * @return {Element}                  The CustomNextArrow element
 */
function CustomNextArrow({className, style, onClick}) {
  return (
    <IconChevron
      className={`${className} ${styles.container__main__quotes__next}`}
      onClick={onClick}
      style={{...style}}
    />
  )
}

/**
 * @param  {object}   props           CustomPrevArrow props
 * @param  {string}   props.className The classname
 * @param  {string}   props.style     The style
 * @param  {Function} props.onClick   The onClick function.
 * @return {Element}                  The CustomPrevArrow element
 */
function CustomPrevArrow({className, style, onClick}) {
  return (
    <IconChevron
      className={`${className} ${styles.container__main__quotes__prev}`}
      onClick={onClick}
      style={{...style}}
    />
  )
}

/**
 * Render the AcfQuotes component.
 *
 * @param  {object}  props                AcfQuotes component props.
 * @param  {string}  props.sectionHeading The heading text.
 * @param  {Array}   props.items          The items for the section.
 * @return {Element}                      The AcfQuotes component.
 */
export default function AcfQuotes({sectionHeading, items}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const settings = {
    dots: true,
    dotsClass: `slick-dots ${styles.container__main__quotes__dots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    afterChange: (i) => setActiveIndex(i)
  }
  const sliderRef = useRef()
  return (
    <div className={styles.outer}>
      <Container className={styles.container}>
        {sectionHeading && (
          <SectionHead
            heading={sectionHeading}
            alignment="center"
            className={styles.container__head}
          />
        )}
        <div className={styles.container__main}>
          <div className={styles.container__main__controls}>
            {items &&
              items.map((item, index) => (
                <div
                  key={uuidv4()}
                  className={
                    index === activeIndex
                      ? `${styles.container__main__controls__author} ${styles['container__main__controls__author--active']}`
                      : styles.container__main__controls__author
                  }
                  onClick={() => {
                    if (sliderRef.current) {
                      setActiveIndex(index)
                      sliderRef.current.slickGoTo(index)
                    }
                  }}
                >
                  {item.name && (
                    <div
                      className={styles.container__main__controls__author__name}
                    >
                      {item?.name}
                    </div>
                  )}
                  {item.description && (
                    <div
                      className={styles.container__main__controls__author__desc}
                      dangerouslySetInnerHTML={{__html: item?.description}}
                    />
                  )}
                </div>
              ))}
          </div>
          <div className={styles.container__main__quotes}>
            <Slider ref={sliderRef} {...settings}>
              {items &&
                items.map((item, index) => (
                  <div
                    key={index}
                    className={styles.container__main__quotes__quote}
                  >
                    <IconQuotes
                      className={
                        styles.container__main__quotes__quote__openquote
                      }
                    />
                    {item.body && (
                      <RichText
                        tag="div"
                        className={styles.container__main__quotes__quote__body}
                      >
                        {item?.body}
                      </RichText>
                    )}
                    <IconQuotes
                      className={
                        styles.container__main__quotes__quote__closequote
                      }
                    />
                    <div
                      className={styles.container__main__quotes__quote__author}
                    >
                      {item.name && (
                        <div
                          className={
                            styles.container__main__quotes__quote__author__name
                          }
                        >
                          {item?.name}
                        </div>
                      )}
                      {item.description && (
                        <div
                          className={
                            styles.container__main__quotes__quote__author__desc
                          }
                          dangerouslySetInnerHTML={{__html: item?.description}}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  )
}

CustomNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
}

CustomPrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
}

AcfQuotes.propTypes = {
  section_heading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string
    })
  )
}
