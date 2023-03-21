import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../ProfileOrderDetails.module.scss'

const ProfileOrderDetailsSkeleton = () => {
  return (
    <div className={`${styles['grid']} ${styles['gap-sm']}`}>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton width={200} height={50} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton height={50} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={5} height={40} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton width={300} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton width={200} height={50} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton height={50} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={3} height={40} />
      </div>
    </div>
  )
}

export default ProfileOrderDetailsSkeleton
