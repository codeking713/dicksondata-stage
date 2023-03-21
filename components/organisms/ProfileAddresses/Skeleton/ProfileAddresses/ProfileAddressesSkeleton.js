import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../../ProfileAddresses.module.scss'

/**
 * Render the ProfileAddressesSkeleton component.
 *
 * @author DAP
 * @return {Element} The ProfileAddressesSkeleton component.
 */
const ProfileAddressesSkeleton = () => {
  return (
    <div>
      <Skeleton width="80%" className={styles.header} />
      <div className={styles.section}>
        <div className={classNames(styles.container)}>
          <Skeleton height={50} />
          <div className={styles.container__copy}>
            <Skeleton className={styles.header} />
          </div>
        </div>
        <div className={classNames(styles.container)}>
          <Skeleton height={50} />
          <div className={styles.container__copy}>
            <Skeleton className={styles.header} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileAddressesSkeleton
