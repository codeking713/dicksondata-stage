/**
 * Handle markup that contains HTML.
 *
 * @author DAP
 * @param  {Array}  props Array of JSX Objects.
 * @param  {string} tag   Outer element tag
 * @return {object}       HTML markup for rendering.
 */
export default function createMarkup(props, tag) {
  let propsWithParagraphs = props

  if (
    tag !== 'p' &&
    !props.toString().includes('<p>') &&
    !props.toString().includes('</p>') &&
    (props.toString().includes('\r\n\r\n') ||
      props.toString().includes('\r\n \r\n'))
  ) {
    propsWithParagraphs = `<p>${props}</p>`
    propsWithParagraphs = propsWithParagraphs.replace(/\r\n\r\n/g, '</p><p>')
    propsWithParagraphs = propsWithParagraphs.replace(/\r\n \r\n/g, '</p><p>')
  }

  return {__html: propsWithParagraphs}
}
