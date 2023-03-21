import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../ProfileAccountDetails.module.scss'

const ProfileAccountDetailsSkeleton = () => {
  return (
    <div
      className={`${styles.container} ${styles['grid']} ${styles['gap-md']}`}
    >
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={50} />
      </div>
      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-6@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-6@md']}`}>
        <Skeleton count={1} width={130} height={10} />
      </div>
      <div className={`${styles['col-6@md']}`}>
        <Skeleton count={1} height={30} />
      </div>
      <div className={`${styles['col-6@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width="80%" height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={100} height={10} />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} height={30} />
      </div>

      <div className={`${styles['col-12@md']}`}></div>
      <div className={`${styles['col-12@md']}`}>
        <Skeleton count={1} width={200} height={60} />
      </div>
    </div>
  )
}

export default ProfileAccountDetailsSkeleton
