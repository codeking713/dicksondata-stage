import {returnUnformattedTel} from '@/functions/utility'
import Image from 'next/image'
import FRA from '../icon-france.png'
import MAL from '../icon-malaysia.png'
import USA from '../icon-usa.png'
import styles from './FooterAddress.module.scss'

/**
 * Render the FooterAddress component.
 *
 * @param  {object}  props          FooterAddress Props
 * @param  {string}  props.location Address
 * @author DAP
 * @return {Element}                The FooterAddress component.
 */
export default function FooterAddress({location}) {
  const flag =
    location?.country === 'USA'
      ? USA
      : location?.country === 'France'
      ? FRA
      : MAL

  return (
    <div className={styles.address}>
      <div className={styles.address__header}>
        <Image
          alt={location?.country}
          className={styles.address__flat}
          width={24}
          height={24}
          src={flag}
        />
        <span className={styles['container__text--countries']}>
          {location?.country}
        </span>
      </div>
      {location?.addressLine1 && (
        <div
          className={styles.address__line}
        >{`${location?.addressLine1}`}</div>
      )}
      {location?.addressLine2 && (
        <div
          className={styles.address__line}
        >{`${location?.addressLine2}`}</div>
      )}
      {location?.addressLine3 && (
        <div
          className={styles.address__line}
        >{`${location?.addressLine3}`}</div>
      )}
      {location?.tel && (
        <div className={styles.address__line}>
          Phone:{' '}
          <a href={`tel:${returnUnformattedTel(location?.tel)}`}>
            {location?.tel}
          </a>
        </div>
      )}
      {location?.email && (
        <div className={styles.address__line}>Email: {location?.email}</div>
      )}
    </div>
  )
}
