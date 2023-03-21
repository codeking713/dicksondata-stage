import PropTypes from 'prop-types'

const IconFilter = ({className, fill}) => (
  <svg
    width="18"
    height="12"
    viewBox="0 0 18 12"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 7H15V5H3V7ZM0 0V2H18V0H0ZM7 12H11V10H7V12Z" fill={fill} />
  </svg>
)

IconFilter.defaultProps = {
  className: null,
  fill: '#FFFFFF'
}

IconFilter.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default IconFilter
