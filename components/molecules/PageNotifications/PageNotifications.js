import Icon from '@/components/atoms/Icon'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './PageNotifications.module.scss'

/**
 * Render the PageNotifications component.
 *
 * @param  {object}   props                   PageNotifications component props.
 * @param  {string}   props.message           Message
 * @param  {string}   props.type              Type
 * @param  {boolean}  props.open              Show the notification panel
 * @param  {Function} props.closeNotification Close the notification panel
 * @param  {Function} props.openNotification  Notify the parent component that the notification is open
 * @param  {string}   props.className         Override the container style
 * @return {Element}                          The PageNotifications component.
 */
export default function PageNotifications({
  message,
  type,
  open,
  closeNotification,
  openNotification,
  className
}) {
  const {headlessConfig} = useWordPressContext()
  const getIcon = (type) => {
    switch (type) {
      case 'ERROR':
        return 'info'
      case 'SUCCESS':
        return 'info'
      case 'WARNING':
        return 'info'
      case 'INFO':
        return 'info'
      default:
        return ''
    }
  }

  if (open && openNotification) openNotification(true)

  return open === true ? (
    <div
      className={`${styles.notification} ${className}
      ${type === 'ERROR' && styles['notification--error']}
      ${type === 'SUCCESS' && styles['notification--success']}
      ${type === 'WARNING' && styles['notification--warning']}
      ${type === 'INFO' && styles['notification--info']}
      `}
    >
      <Icon
        className={styles.notification__icon}
        icon={getIcon(type)}
        size="lg"
        title={getTranslation(headlessConfig, type)}
      />
      <div
        className={styles.notification__content}
        dangerouslySetInnerHTML={{__html: message}}
      ></div>
      {closeNotification && (
        <div
          className={styles.notification__close}
          onClick={() => closeNotification()}
        >
          <Icon
            title={getTranslation(headlessConfig, 'CLOSE')}
            style="fill"
            icon="closeSquare"
          />
        </div>
      )}
    </div>
  ) : (
    ''
  )
}

PageNotifications.defaultProps = {
  open: false
}

PageNotifications.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['INFO', 'WARNING', 'SUCCESS', 'ERROR']),
  open: PropTypes.bool
}
