import Accordion from '@/components/molecules/Accordion'
import Link from 'next/link'
import {v4 as uuidv4} from 'uuid'
import BottomFooter from '../BottomFooter'
import FooterAddress from '../FooterAddress'
import styles from './MobileFooter.module.scss'

/**
 * Render the MobileFooter component.
 *
 * @param  {object}  props                MobileFooter props
 * @param  {object}  props.headlessConfig Headless Config data
 * @param  {Array}   props.menus          Menu list
 * @param  {Array}   props.locations      Locations list
 * @author DAP
 * @return {Element}                      The MobileFooter component.
 */
export default function MobileFooter({menus, locations}) {
  return (
    <div className={styles.mfooter}>
      <div className={styles['mfooter__container--grayLinks']}>
        {menus?.footer_menu?.map((item, index) => (
          <Accordion
            dangerouslySetInnerHTML={false}
            key={uuidv4()}
            index={index}
            title={item.label}
            content={item?.children?.map((items, index) => (
              <div
                className={styles['mfooter__container__content']}
                key={index}
              >
                <Link href={items.path ?? '#'}>{items.label}</Link>
              </div>
            ))}
          />
        ))}
        <Accordion
          dangerouslySetInnerHTML={false}
          title="Address"
          content={
            <div className={styles['mfooter__container__content']}>
              {locations.map((location, index) => (
                <div key={index}>
                  <FooterAddress location={location} />
                </div>
              ))}
            </div>
          }
        />
      </div>
      <BottomFooter
        footerSubMenu={menus?.footer_sub_menu}
        footerSocialMenu={menus?.footer_social_menu}
        isMobile={true}
      />
    </div>
  )
}
