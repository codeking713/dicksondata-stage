import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../ProfileOrder.module.scss'

const ProfileOrderSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles['grid']} ${styles['gap-sm']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
      </div>
    </div>
  )
}

export default ProfileOrderSkeleton
