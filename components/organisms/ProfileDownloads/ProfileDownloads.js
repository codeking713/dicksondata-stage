import styles from './ProfileDownloads.module.scss'

/**
 * Render the ProfileDownloads component.
 *
 * @author DAP
 * @return {Element} The ProfileDownloads component.
 */
export default function ProfileDownloads() {
  return (
    <div className={styles.container}>
      <p>No Downloads are available for your account.</p>
    </div>
  )
}
