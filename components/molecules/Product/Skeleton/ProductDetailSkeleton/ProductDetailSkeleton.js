import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the ProductDetailSkeleton component.
 *
 * @author DAP
 * @return {Element} The ProductDetailSkeleton component.
 */
const ProductDetailSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-lg']}`}>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={400} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <div className={`${styles['grid']} ${styles['gap-sm']}`}>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={40} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} width={200} height={10} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} width={100} height={30} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} width={150} height={20} />
            </div>
          </div>
        </div>
        <div className={`${styles.skeleton__subsection} ${styles['col-4@md']}`}>
          <Skeleton count={1} height={60} />
          <Skeleton count={1} height={60} />
          <Skeleton count={1} height={60} />
          <Skeleton count={1} height={60} />
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={100} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={100} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={100} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={100} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
      </div>
    </>
  )
}

export default ProductDetailSkeleton
