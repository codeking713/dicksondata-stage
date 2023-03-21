import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Skeleton.module.scss'

/**
 * Render the LostPasswordSkeleton component.
 *
 * @author DAP
 * @return {Element} The LostPasswordSkeleton component.
 */
const LostPasswordSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} width={300} height={10} />
          <Skeleton count={1} width={150} height={10} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} width={300} height={40} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} width={150} height={40} />
        </div>
      </div>
    </>
  )
}

export default LostPasswordSkeleton
