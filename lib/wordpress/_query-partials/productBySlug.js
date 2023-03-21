import allMenus from './allMenus'
import defaultSeoFields from './defaultSeoFields'

// Query partial: retrieve product data by slug.
const productBySlug = `
  ${defaultSeoFields}
  ${allMenus}
`

export default productBySlug
