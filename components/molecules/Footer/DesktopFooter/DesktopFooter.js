import Button from '@/components/atoms/Button'
import {getTranslation, replaceAdditionalLangCodes} from '@/functions/utility'
import cn from 'classnames'
import Link from 'next/link'
import BottomFooter from '../BottomFooter'
import FooterAddress from '../FooterAddress'
import styles from './DesktopFooter.module.scss'
/**
 * Render the DesktopFooter component.
 *
 * @param  {object}  props                DesktopFooter component props
 * @param  {object}  props.headlessConfig Headless config data
 * @param  {Array}   props.menus          Menus
 * @param  {Array}   props.locations      Locations
 * @author DAP
 * @return {Element}                      The DesktopFooter component.
 */
export default function DesktopFooter({headlessConfig, menus, locations}) {
  return (
    <div className={styles['dfooter']}>
      <div
        className={cn(
          styles.dfooter__container,
          styles['dfooter__container--menus'],
          styles['dfooter__container--grayLinks']
        )}
      >
        <div className={styles.dfooter__container__sections}>
          {menus?.footer_menu?.map((item, index) => (
            <div
              key={index}
              className={styles.dfooter__container__sections__section}
            >
              <p
                className={
                  styles.dfooter__container__sections__section__heading
                }
              >
                {item.label}
              </p>
              {item?.children?.map((items, index) => (
                <div key={index}>
                  <div
                    className={
                      styles.dfooter__container__sections__section__content
                    }
                  >
                    {item.label == 'Logins' ? (
                      (index == 0 && (
                        <div
                          className={
                            styles.dfooter__container__sections__section__content__button
                          }
                        >
                          <Button
                            icon={'login'}
                            text={items.label}
                            url={items.path}
                            type="ghost"
                          />
                        </div>
                      )) || (
                        <Button
                          icon={'computer'}
                          text={items.label}
                          url={items.path}
                          type="ghost"
                        />
                      )
                    ) : (
                      <Link
                        href={replaceAdditionalLangCodes(items.path) ?? '#'}
                      >
                        {items.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.dfooter__container__sections__section}>
            <p
              className={styles.dfooter__container__sections__section__heading}
            >
              {headlessConfig && getTranslation(headlessConfig, 'ADDRESS')}
            </p>
            <div className={styles.dfooter__container__address__section}>
              {locations.map((location, index) => (
                <div key={index} className={styles.dfooter__location__address}>
                  <FooterAddress location={location} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomFooter
        footerSubMenu={menus?.footer_sub_menu}
        footerSocialMenu={menus?.footer_social_menu}
        headlessConfig={headlessConfig}
      />
    </div>
  )
}
