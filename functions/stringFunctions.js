/**
 * Capitalize first letter of a string.
 *
 * @param  {string} str Input string
 * @return {object}     Text output of the html
 */
export const stringCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert a string to a camel case value.
 *
 * @param  {string} str Input string
 * @return {object}     Text output of the html
 */
export const stringCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Format Product Tag by category
 *
 * @param  {string} str Html input
 * @return {object}     Text output of the html
 */
export const stripHTML = (str) => {
  if (typeof window !== 'undefined') {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = str
    return tmp.textContent || tmp.innerText || ''
  }
  return str
}
