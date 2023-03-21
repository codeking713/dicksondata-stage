import ProductListSkeleton from '@/components/molecules/ProductList/Skeleton/ProductListSkeleton'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the ProductOverviewSkeleton component.
 *
 * @author DAP
 * @return {Element} The ProductOverviewSkeleton component.
 */
const ProductOverviewSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={1} height={50} className={styles['skeleton--mb1']} />
          <Skeleton count={1} height={400} />
        </div>
        <div className={`${styles['col-9@md']}`}>
          <div className={`${styles['grid']} ${styles['gap-sm']}`}>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div
              className={`${styles['skeleton--right']} ${styles['skeleton--mb1']} ${styles['col-12@md']}`}
            >
              <Skeleton count={1} width={100} height={40} />
            </div>
            <ProductListSkeleton placeholderCount={9} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductOverviewSkeleton
