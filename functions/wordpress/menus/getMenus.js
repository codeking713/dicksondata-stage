import formatHeirarchialMenu from './formatHeirarchialMenu'

/**
 * Get menu data from WPGraphQL.
 *
 * @author DAP
 * @param  {object} menuData Query response menu data.
 * @return {Array}           Returns array of menu objects.
 */
export default function getMenus(menuData) {
  const filteredMenus = {}

  const {primary_menu, footer_menu, footer_social_menu, footer_sub_menu} =
    menuData
  filteredMenus['primary_menu'] = formatHeirarchialMenu(primary_menu.nodes)
  filteredMenus['footer_menu'] = formatHeirarchialMenu(footer_menu.nodes)
  filteredMenus['footer_social_menu'] = formatHeirarchialMenu(
    footer_social_menu.nodes
  )
  filteredMenus['footer_sub_menu'] = formatHeirarchialMenu(
    footer_sub_menu.nodes
  )

  return filteredMenus || []
}
