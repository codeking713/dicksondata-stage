export const isExternalLink = (url) => {
  const tmp = document.createElement('a')
  tmp.href = url
  return tmp.host !== window.location.host
}

export const returnUnformattedTel = (phone) => {
  if (phone) {
    return phone?.toString()?.replace(/\D/g, '')
  }
}

export const getTranslation = (headlessConfig, key) => {
  const translation = headlessConfig?.additionalSettings?.translations?.find(
    (t) => t.key === key
  )
  return translation ? translation.value : key
}

export const handleError = (errorCode, errorMessage) => {
  switch (errorCode) {
    case 500:
      throw new Error(`${errorMessage ?? 'Failed to fetch data'}`)
    case 404:
    default:
      return {
        notFound: true
      }
  }
}

// Temporary solution to remove multiple language codes from menu
export const replaceAdditionalLangCodes = (link) => {
  if (link) {
    return link.replace('/fr_fr/', '/').replace('/en_gb/', '/')
  } else {
    return '#'
  }
}
