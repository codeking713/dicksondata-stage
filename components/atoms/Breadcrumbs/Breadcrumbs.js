import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './Breadcrumbs.module.scss'

/**
 * Render the Breadcrumbs component.
 *
 * @author DAP
 * @param  {object}  props             The component attributes as props.
 * @param  {Array}   props.breadcrumbs The breadcrumb array.
 * @return {Element}                   The Breadcrumbs component.
 */
export default function Breadcrumbs({breadcrumbs}) {
  return (
    <>
      {!!breadcrumbs?.length && (
        <ul className={styles.breadcrumbs}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li className={styles.breadcrumbs__breadcrumb} key={index}>
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link href={breadcrumb?.url ?? '#'}>
                    <a className={styles.breadcrumbs__breadcrumb__link}>
                      {breadcrumb?.text}
                    </a>
                  </Link>
                  <span className={styles.breadcrumbs__breadcrumb__sep}>
                    {' '}
                    &raquo;{' '}
                  </span>
                </>
              ) : (
                <span>{breadcrumb?.text}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
}
