import PropTypes from 'prop-types'

const IconCaretRight = ({className, color, backgroundColor}) => (
  <span className={className}>
    <svg
      width="12"
      height="12"
      fill={backgroundColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_24:1452)">
        <path
          d="M3.86.277a1.21 1.21 0 00-1.541 0 .86.86 0 000 1.337L7.37 6l-5.05 4.386a.86.86 0 000 1.337 1.21 1.21 0 001.54 0l5.822-5.055a.86.86 0 000-1.337L3.86.277z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_24:1452">
          <path fill={backgroundColor} d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  </span>
)

IconCaretRight.defaultProps = {
  className: null,
  color: '#fff',
  backgroundColor: '#000'
}

IconCaretRight.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default IconCaretRight
