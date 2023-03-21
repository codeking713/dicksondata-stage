import PropTypes from 'prop-types'

const IconCaretDown = ({className, strokeWidth}) => (
  <svg
    viewBox="0 0 9 6"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="none" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline
        stroke="currentColor"
        strokeWidth={strokeWidth}
        points="8.25100016 1.25 4.50100016 5 0.751000156 1.25"
      ></polyline>
    </g>
  </svg>
)

IconCaretDown.defaultProps = {
  className: null,
  strokeWidth: '1.5'
}

IconCaretDown.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.string
}

export default IconCaretDown
