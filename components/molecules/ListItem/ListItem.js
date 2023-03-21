import RichText from '@/components/atoms/RichText'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './ListItem.module.scss'

/**
 * Render the ListItem component.
 *
 * @param  {object}  props                      ListItem component props.
 * @param  {object}  props.icon                 The list item icon/image
 * @param  {string}  props.title                The list item title
 * @param  {string}  props.text                 The list item text
 * @param  {string}  props.iconPosition         The list item text position top, left - default is left
 * @param  {number}  props.iconStyle            Indicates the style in which the icon should render. Possible values - 1, 2, empty
 * @param  {number}  props.iconAlignment        Indicates the alignment in which the icon should render. Possible values - top or center
 * @param  {string}  props.titleSize            Title size. Possible values - large, medium, empty. default/empty will provide a medium font size
 * @param  {string}  props.className            The optional classname
 * @param  {string}  props.listContentClassName Optional list content classname
 * @return {Element}                            The ListItem component.
 */
export default function ListItem({
  icon,
  title,
  text,
  iconStyle,
  iconPosition,
  iconAlignment,
  titleSize,
  className,
  listContentClassName
}) {
  const listClassnames = cn(styles.list, className, {
    [styles['list--icontop']]: iconPosition === 'top',
    [styles['list--aligncenter']]: iconAlignment === 'center'
  })

  const listIconClassnames = cn(
    styles.list__icon,
    iconAlignment === 'top' && styles['list__icon--icontop']
  )

  const listIconOutlineClassnames = cn(
    styles.list__icon__outline,
    iconStyle === 1 && styles['list__icon__outline--style1'],
    iconStyle === 2 && styles['list__icon__outline--style2']
  )

  const listContentClassnames = cn(
    styles.list__content,
    listContentClassName,
    iconPosition === 'top' && styles['list__content--icontop']
  )

  const listContentTitleClassnames = cn(
    styles.list__content__title,
    titleSize === 'large' && styles['list__content__title--large']
  )

  return (
    <div className={listClassnames}>
      <div className={listIconClassnames}>
        <div className={listIconOutlineClassnames}>
          <img
            className={styles.list__icon__outline__img}
            src={icon?.mediaItemUrl}
            alt={icon?.altText}
          />
        </div>
      </div>
      <div className={listContentClassnames}>
        {title && <div className={listContentTitleClassnames}>{title}</div>}
        {text && (
          <RichText className={styles.list__content__text}>{text}</RichText>
        )}
      </div>
    </div>
  )
}

ListItem.propTypes = {
  icon: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  title: PropTypes.any,
  text: PropTypes.string,
  iconStyle: PropTypes.oneOf([1, 2]),
  iconPosition: PropTypes.oneOf(['top', 'left']),
  iconAlignment: PropTypes.oneOf(['top', 'center']),
  titleSize: PropTypes.oneOf(['large', 'medium']),
  className: PropTypes.string,
  listContentClassName: PropTypes.string
}

ListItem.defaultProps = {
  listContentClassName: '',
  iconAlignment: 'top'
}
