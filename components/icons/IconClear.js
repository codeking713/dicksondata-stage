import PropTypes from 'prop-types'

const IconClear = ({className, fill}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
      fill={fill}
    />
  </svg>
)

IconClear.defaultProps = {
  className: null,
  fill: '#FFFFFF'
}

IconClear.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default IconClear
