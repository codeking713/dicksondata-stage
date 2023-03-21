import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the SupportCategorySkeleton component.
 *
 * @param  {object}  props           Props
 * @param  {number}  props.tileCount Tile count
 * @author DAP
 * @return {Element}                 The SupportCategorySkeleton component.
 */
const SupportCategorySkeleton = ({tileCount = 8}) => {
  return (
    <>
      <div
        className={`${styles['grid']} ${styles['gap-xl']} ${styles['skeleton']}`}
      >
        {[...Array(tileCount)].map((e, i) => (
          <div
            key={i}
            className={`${styles['col-12@xs']} ${styles['col-5@sm']} ${styles['col-4@md']} ${styles['col-3@lg']} ${styles['skeleton__item']} ${styles['skeleton--center']}`}
          >
            <Skeleton count={1} height={150} />
            <Skeleton
              className={`${styles.skeleton__topgap}`}
              count={1}
              height={10}
            />
            <Skeleton
              className={`${styles.skeleton__topgap}`}
              width={120}
              count={1}
              height={10}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SupportCategorySkeleton
