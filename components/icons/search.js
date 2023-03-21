import PropTypes from 'prop-types'

const IconSearch = ({className, strokeWidth}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinejoin="round"
    >
      <path
        d="M9.81.74a9.06 9.06 0 1 0 0 18.12 9.06 9.06 0 1 0 0-18.13Z"
        transform="matrix(.92-.392.391.92-3.056 4.62)"
      />
      <path d="M16.22 16.22l7.03 7.03" />
    </g>
  </svg>
)

IconSearch.defaultProps = {
  className: null,
  strokeWidth: '1.5'
}

IconSearch.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.string
}

export default IconSearch
