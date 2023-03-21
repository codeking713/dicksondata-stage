import {useWordPressContext} from '@/components/common/WordPressProvider'
import DesktopFooter from '@/components/molecules/Footer/DesktopFooter'
import MobileFooter from '@/components/molecules/Footer/MobileFooter'
import {locations} from './Location.json'

/**
 * Render the Footer component.
 *
 * @author DAP
 * @return {Element} The Footer component.
 */
export default function Footer() {
  const {menus, headlessConfig} = useWordPressContext()

  return (
    <footer>
      <DesktopFooter
        menus={menus}
        headlessConfig={headlessConfig}
        locations={locations}
      />
      <MobileFooter menus={menus} locations={locations} />
      <input type="hidden" id="version" name="version" value="v1.5"></input>
    </footer>
  )
}
