import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import Flickity from 'react-flickity-component'
import {v4 as uuidv4} from 'uuid'
import styles from './ProductDetailsGallery.module.scss'

const ProductDetailsGallery = ({galleryImages, className}) => {
  // eslint-disable-next-line no-unused-vars
  const [featuredImgIndex, setFeaturedImgIndex] = useState(0)

  const flktyFeatured = useRef(null)
  const flktyThumbs = useRef(null)
  const flktyThumbsPerSlide = 3

  const galleryClassnames = classNames(className, styles.gallery)

  useEffect(() => {
    const flktyFeaturedRef = flktyFeatured.current
    const flktyThumbsRef = flktyThumbs.current

    flktyFeaturedRef.on('change', () => {
      // setFeaturedImgIndex(flktyFeaturedRef.selectedIndex)
      let setThumbIndexTo = Math.floor(
        flktyFeaturedRef.selectedIndex / flktyThumbsPerSlide
      )
      flktyThumbsRef.select(setThumbIndexTo)
    })

    return () => {
      flktyFeaturedRef?.destroy()
      flktyThumbsRef?.destroy()
    }
  }, [flktyFeatured, flktyThumbs])

  const handleThumbClick = (thumbIndex) => {
    flktyFeatured.current.select(thumbIndex)
    // setFeaturedImgIndex(thumbIndex)
  }

  const flickityFeaturedOptions = {
    contain: true,
    pageDots: false,
    prevNextButtons: false,
    draggable: true
  }

  const flickityThumbOptions = {
    groupCells: flktyThumbsPerSlide,
    contain: true,
    pageDots: false,
    draggable: true
  }

  return (
    <div className={galleryClassnames}>
      {galleryImages?.length > 0 && (
        <Flickity
          flickityRef={(flickityFeaturedRef) =>
            (flktyFeatured.current = flickityFeaturedRef)
          }
          className={styles.gallery__focus}
          options={flickityFeaturedOptions}
          elementType={'div'}
          disableImagesLoaded={false}
          reloadOnUpdate
        >
          {galleryImages.map((thumb) => (
            <div
              className={
                typeof thumb?.mediaItemUrl !== 'undefined'
                  ? styles.gallery__focus__item
                  : `${styles.gallery__focus__item} ${styles['gallery__focus__item--placeholder']}`
              }
              key={uuidv4()}
            >
              <img
                className={styles.gallery__focus__item__img}
                src={
                  typeof thumb?.mediaItemUrl !== 'undefined'
                    ? thumb.mediaItemUrl
                    : '/images/product-placeholder.svg'
                }
                alt={thumb?.altText}
              />
            </div>
          ))}
        </Flickity>
      )}
      {galleryImages?.length > 1 && (
        <Flickity
          flickityRef={(flickityThumbsRef) =>
            (flktyThumbs.current = flickityThumbsRef)
          }
          className={styles.gallery__thumbs}
          elementType={'div'}
          options={flickityThumbOptions}
          disableImagesLoaded={false}
          reloadOnUpdate
        >
          {galleryImages.map((thumb, index) => (
            <div
              // className={
              //   featuredImgIndex === index
              //     ? `${styles.gallery__thumbs__item} ${styles['gallery__thumbs__item--active']}`
              //     : styles.gallery__thumbs__item
              // }
              className={`${styles.gallery__thumbs__item} ${styles['gallery__thumbs__item--active']}`}
              key={uuidv4()}
              onClick={() => handleThumbClick(index)}
            >
              <img
                className={styles.gallery__thumbs__item__img}
                src={thumb.mediaItemUrl}
                alt={thumb.altText}
              />
            </div>
          ))}
        </Flickity>
      )}
    </div>
  )
}

export default ProductDetailsGallery
