// Query partial: retrieve all menus.
const allMenus = `
  primary_menu: menuItems(where: {language: $menuLanguage, location: PRIMARY_MENU}, first: 1000) {
    nodes {
      id
      parentId
      label
      path
      target
      title
      locations
      databaseId
    }
  }
  footer_menu: menuItems(where: {language: $menuLanguage, location: FOOTER_MENU}, first: 1000) {
    nodes {
      id
      parentId
      label
      path
      target
      title
      locations
      databaseId
    }
  }
  footer_social_menu: menuItems(where: {language: $menuLanguage, location: FOOTER_SOCIAL_MENU}, first: 1000) {
    nodes {
      id
      parentId
      label
      path
      target
      title
      locations
      databaseId
    }
  }
  footer_sub_menu: menuItems(where: {language: $menuLanguage, location: FOOTER_SUB_MENU}, first: 1000) {
    nodes {
      id
      parentId
      label
      path
      target
      title
      locations
      databaseId
    }
  }
`

export default allMenus
