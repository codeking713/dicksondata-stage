import Icon from '@/components/atoms/Icon'
import cn from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.scss'

/**
 * Render the common inner part of the button component.
 *
 * @param  {object}  props          The props object.
 * @param  {string}  props.icon     Optional icon.
 * @param  {boolean} props.iconOnly Whether this button is an icon only.
 * @param  {string}  props.text     Button text or aria-label.
 * @param  {boolean} props.loading  Is data loading
 * @return {Element}                The inside of the Button component.
 */
function ButtonInner({icon, iconOnly, text, loading}) {
  if (!loading) {
    return (
      <>
        {!iconOnly && (
          <span
            dangerouslySetInnerHTML={{__html: text}}
            className={styles.button__text}
          />
        )}
        {icon && (
          <Icon icon={icon} title={text} ariaHidden={text ? true : false} />
        )}
      </>
    )
  } else {
    return (
      <>
        <span className={styles.button__text}>Sending...</span>
        <div className={styles.button__loading}>
          <svg className={styles.button__loading__svg} viewBox="0 0 100 100">
            <circle
              className={`${styles.button__loading__svg__circle} ${styles['button__loading__svg__circle--bg']}`}
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <circle
              className={`${styles.button__loading__svg__circle} ${styles['button__loading__svg__circle--animate']}`}
              cx="50"
              cy="50"
              r="45"
            ></circle>
          </svg>
        </div>
      </>
    )
  }
}

ButtonInner.propTypes = {
  icon: PropTypes.string,
  iconOnly: PropTypes.bool,
  text: PropTypes.string
}

/**
 * @param  {object}   props              The props object.
 * @param  {string}   props.attributes   Optional attributes to add to the button.
 * @param  {string}   props.className    Optional classNames.
 * @param  {boolean}  props.disabled     Whether the button is disabled.
 * @param  {boolean}  props.fluid        Whether the button should be full width.
 * @param  {string}   props.icon         Icon to render inside the button.
 * @param  {boolean}  props.iconOnly     Whether this button should render as an icon only button.
 * @param  {string}   props.iconLeft     Whether to render the icon on the left.
 * @param  {Function} props.onClick      Button onClick function.
 * @param  {string}   props.size         Button size.
 * @param  {object}   props.style        Custom button styles.
 * @param  {boolean}  props.styleOutline Whether this button has the outline style.
 * @param  {string}   props.tag          The wrapper tag.
 * @param  {string}   props.text         Button text.
 * @param  {string}   props.type         Button type.
 * @param  {string}   props.url          Button link url.
 * @param  {boolean}  props.urlExternal  Whether the url on this button links to an external site.
 * @param  {boolean}  props.isSubmit     Is the button type submit or regular button
 * @param  {boolean}  props.loading      Is data loading
 * @return {Element}                     The button component.
 */
export default function Button({
  attributes,
  className,
  disabled,
  fluid,
  icon,
  iconOnly,
  iconLeft,
  onClick,
  isSubmit,
  size,
  style,
  styleOutline,
  tag,
  text,
  type,
  url,
  urlExternal,
  loading
}) {
  const buttonClassNames = cn(
    styles.button,
    className,
    iconOnly && styles['button--icononly'],
    iconLeft && styles['button--iconleft'],
    fluid && styles['button--fluid'],
    disabled && styles['button--disabled'],
    styles[`button--${size}`],
    styles[`button--${type}`],
    styleOutline && styles['button--ghost'],
    loading && styles['button--loading']
  )

  if (url) {
    return urlExternal ? (
      <a
        href={url}
        className={buttonClassNames}
        aria-label={text}
        style={style}
        {...attributes}
      >
        <ButtonInner
          icon={icon}
          iconOnly={iconOnly}
          iconLeft={iconLeft}
          text={text}
        />
      </a>
    ) : (
      <NextLink href={url ?? '#'}>
        <a
          className={buttonClassNames}
          aria-label={text}
          style={style}
          {...attributes}
        >
          <ButtonInner
            icon={icon}
            iconOnly={iconOnly}
            iconLeft={iconLeft}
            text={text}
          />
        </a>
      </NextLink>
    )
  } else {
    return (
      // Render element with default button tag.
      React.createElement(
        `${tag}`,
        {
          className: buttonClassNames,
          'aria-label': text,
          onClick,
          ...attributes,
          disabled,
          role: 'button',
          style,
          type: isSubmit ? 'submit' : 'button'
        },
        <ButtonInner
          icon={icon}
          iconOnly={iconOnly}
          iconLeft={iconLeft}
          text={text}
          loading={loading}
        />
      )
    )
  }
}

Button.propTypes = {
  attributes: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  iconOnly: PropTypes.bool,
  iconLeft: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  style: PropTypes.shape({
    background: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.string
  }),
  styleOutline: PropTypes.bool,
  tag: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  url: PropTypes.string,
  urlExternal: PropTypes.bool,
  isSubmit: PropTypes.bool,
  loading: PropTypes.bool
}

Button.defaultProps = {
  disabled: false,
  iconOnly: false,
  iconLeft: false,
  size: 'md',
  tag: 'button',
  type: 'primary',
  urlExternal: false,
  loading: false,
  text: 'Learn More'
}
