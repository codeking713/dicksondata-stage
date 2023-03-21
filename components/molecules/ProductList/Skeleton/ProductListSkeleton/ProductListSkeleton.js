import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the ProductListSkeleton component.
 *
 * @param  {object}  props                  ProductListSkeleton component props.
 * @param  {number}  props.placeholderCount Number of product placeholders to display
 * @return {Element}                        The ProductListSkeleton component.
 */

const ProductListSkeleton = ({placeholderCount}) => {
  const renderProductsPlaceholder = () => {
    let content = []
    for (let i = 0; i < placeholderCount; i++) {
      content.push(renderSinglePlaceholder(`placeholder_${i}`))
    }
    return content
  }

  const renderSinglePlaceholder = (key) => {
    return (
      <div key={key} className={`${styles['col-4@md']}`}>
        <Skeleton count={1} height={200} />
        <div className={styles['skeleton__gap--sm']}></div>
        <Skeleton count={1} width={100} height={10} />
        <Skeleton count={1} height={30} />
        <div className={styles['skeleton__gap--sm']}></div>
        <Skeleton count={1} height={10} />
        <Skeleton count={1} height={10} />
        <Skeleton count={1} height={10} />
        <div className={styles['skeleton__gap--md']}></div>
        <Skeleton count={1} width={100} height={20} />
        <div className={styles['skeleton__gap--sm']}></div>
        <Skeleton count={1} height={60} />
      </div>
    )
  }
  return (
    <div className={`${styles['grid']} ${styles['gap-lg']}`}>
      {renderProductsPlaceholder()}
    </div>
  )
}

export default ProductListSkeleton
