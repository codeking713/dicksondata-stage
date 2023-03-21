import RichText from '@/components/atoms/RichText'
import getBlockStyles from '@/functions/wordpress/blocks/getBlockStyles'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

export const coreParagraphFragment = `
  fragment CoreParagraphFragment on CoreParagraph {
    renderedHtml
    attributes {
      align
      backgroundColor
      className
      content
      direction
      fontSize
      placeholder
      textColor
    }
  }
`
/**
 * Paragraph Block
 *
 * The core Paragraph block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props                    The component props.
 * @param  {string}  props.backgroundColorHex The background color hex value.
 * @param  {string}  props.className          Optional classnames.
 * @param  {string}  props.align              Optional alignment style.
 * @param  {string}  props.anchor             Optional anchor/id.
 * @param  {boolean} props.dropCap            Whether the paragraph has a drop cap.
 * @param  {object}  props.style              The style attributes (Typography panel).
 * @param  {string}  props.renderedHtml       Rendered Html
 * @param  {string}  props.tag                Tag
 * @param  {string}  props.textColorHex       The text color hex value.
 * @return {Element}                          The RichText component.
 */
export default function BlockParagraph({
  align,
  anchor,
  backgroundColorHex,
  className,
  dropCap,
  style,
  textColorHex,
  renderedHtml,
  tag
}) {
  const alignment = !align ? 'left' : align

  const paragraphStyle = getBlockStyles({
    backgroundColorHex,
    textColorHex,
    style
  })

  return (
    <RichText
      className={cn(
        `text-${alignment}`,
        className,
        styles.main,
        styles['main--paragraph']
      )}
      id={anchor}
      tag={tag}
      dropCap={dropCap}
      style={paragraphStyle}
    >
      {renderedHtml}
    </RichText>
  )
}

BlockParagraph.defaultProps = {
  tag: 'p'
}

BlockParagraph.propTypes = {
  align: PropTypes.string,
  anchor: PropTypes.string,
  backgroundColorHex: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
  dropCap: PropTypes.bool,
  style: PropTypes.object,
  textColorHex: PropTypes.string
}
