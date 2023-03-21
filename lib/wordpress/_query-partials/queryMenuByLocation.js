import {gql} from '@apollo/client'

// Fragment: retrieve menu item fields.
export const menuItemsFragment = gql`
  fragment menuItemsFragment on RootQueryToMenuConnection {
    nodes {
      name
      menuItems {
        nodes {
          label
          url
        }
      }
    }
  }
`

// Query partial: retrieve all menus.
const queryMenuByLocation = gql`
  query GET_FOOTER {
    Products: menus(where: {location: FOOTER_MAIN_MENU_COL_1}) {
      ...menuItemsFragment
    }
    Resources: menus(where: {location: FOOTER_MAIN_MENU_COL_2}) {
      ...menuItemsFragment
    }
    About: menus(where: {location: FOOTER_MAIN_MENU_COL_3}) {
      ...menuItemsFragment
    }
    Logins: menus(where: {location: FOOTER_MAIN_MENU_COL_4}) {
      ...menuItemsFragment
    }
    Submenu: menus(where: {location: FOOTER_SUB_MENU}) {
      ...menuItemsFragment
    }
    Social: menus(where: {location: FOOTER_SOCIAL_MENU}) {
      ...menuItemsFragment
    }
  }
  ${menuItemsFragment}
`

export default queryMenuByLocation
