import headlessConfig from '@/lib/wordpress/_query-partials/headlessConfig'
import allMenus from './allMenus'
import defaultSeoFields from './defaultSeoFields'

// Query partial: retrieve default data for all frontend pages.
const defaultPageData = `
  ${defaultSeoFields}
  ${allMenus}
  ${headlessConfig}
`

export default defaultPageData
