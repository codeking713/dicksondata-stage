import PropTypes from 'prop-types'

const IconArrowRight = ({className, color, backgroundColor}) => (
  <svg
    viewBox="0 0 12 12"
    fill={backgroundColor}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.837 5.618l-3.571-3.46a.57.57 0 00-.79 0 .529.529 0 000 .765l2.619 2.536H.558A.55.55 0 000 6c0 .298.25.54.558.54h9.537L7.477 9.078a.529.529 0 000 .765.566.566 0 00.394.158.566.566 0 00.395-.158l3.57-3.46a.529.529 0 000-.764z"
      fill={color}
    />
  </svg>
)

IconArrowRight.defaultProps = {
  className: null,
  color: '#fff',
  backgroundColor: '#000'
}

IconArrowRight.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default IconArrowRight
