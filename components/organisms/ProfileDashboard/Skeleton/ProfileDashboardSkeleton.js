import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../ProductDashboard.module.scss'

const ProfileDashboardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles['grid']} ${styles['gap-sm']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} width={400} height={50} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} width={100} height={20} />
        </div>
      </div>
    </div>
  )
}

export default ProfileDashboardSkeleton
