import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './SearchResultSkeleton.module.scss'

/**
 * Render the SearchResultSkeleton component.
 *
 * @param  {object}  props           Props
 * @param  {number}  props.tileCount Tile count
 * @author DAP
 * @return {Element}                 The SearchResultSkeleton component.
 */
const SearchResultSkeleton = ({tileCount = 8}) => {
  return (
    <>
      <div
        className={`${styles['grid']} ${styles['gap-xl']} ${styles['skeleton']}`}
      >
        <div className={`${styles['skeleton__mvbgap']}`}>
          <Skeleton count={1} height={10} width={50} />
        </div>
        {[...Array(tileCount)].map((e, i) => (
          <div
            key={i}
            className={`${styles['skeleton__lvbgap']} ${styles['col-12@xs']} ${styles['col-5@sm']} ${styles['col-4@md']} ${styles['col-3@lg']} ${styles['skeleton__item']} ${styles['skeleton--center']}`}
          >
            <Skeleton
              count={1}
              width={300}
              height={30}
              className={`${styles['skeleton__svbgap']}`}
            />
            <Skeleton count={3} height={10} />
            <Skeleton
              className={`${styles.skeleton__topgap}`}
              width={120}
              count={1}
              height={30}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchResultSkeleton
