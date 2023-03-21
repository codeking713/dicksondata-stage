import Icon from '@/components/atoms/Icon'
import {getTranslation} from '@/functions/utility'
import Link from 'next/link'
import styles from './BottomFooter.module.scss'
import {replaceAdditionalLangCodes} from '@/functions/utility'

/**
 * Render the BottomFooter component.
 *
 * @param  {object}  props                  BottomFooter Props
 * @param  {Array}   props.footerSubMenu    Sub menu items
 * @param  {Array}   props.footerSocialMenu Social media links
 * @param  {boolean} props.isMobile         Mobile view flag
 * @param  {object}  props.headlessConfig   Headless config data
 * @author DAP
 * @return {Element}                        The BottomFooter component.
 */
export default function BottomFooter({
  footerSubMenu,
  footerSocialMenu,
  isMobile = false,
  headlessConfig
}) {
  return (
    <div
      className={`
        ${styles.container}
        ${
          isMobile
            ? styles['container--bottom--mobile']
            : styles['container--bottom']
        }
      `}
    >
      <div className={styles.container__legalLinks}>
        <span className={styles.container__legalLinks__copyrights}>
          {getTranslation(headlessConfig, 'COPYRIGHT')} &copy; 2020 -{' '}
          {new Date().getFullYear()}
        </span>
        {footerSubMenu?.map((item, index) => {
          return (
            <div className={styles.container__legalLinks__links} key={index}>
              <Link href={replaceAdditionalLangCodes(item.path) ?? '#'}>
                {item.label}
              </Link>
            </div>
          )
        })}
      </div>
      <div
        className={`${styles.container__socialLinks} ${
          isMobile && styles['container__socialLinks--mobile']
        }`}
      >
        {footerSocialMenu?.map((item, index) => {
          return (
            <a
              className={styles.container__socialLinks__links}
              key={index}
              href={replaceAdditionalLangCodes(item?.path)}
              rel="noreferrer"
            >
              <Icon
                style="line"
                title={item?.label.toLowerCase()}
                icon={item?.label.toLowerCase()}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
