import PropTypes from 'prop-types'

const IconChevron = ({className, onClick, style}) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    style={style}
  >
    <path d="M3.85914 0.276953C3.4333 -0.0923176 2.74468 -0.0923176 2.31884 0.276953C1.89372 0.646222 1.89372 1.24463 2.31884 1.6139L7.37143 5.99968L2.31884 10.3861C1.89372 10.7554 1.89372 11.3538 2.31884 11.723C2.74468 12.0923 3.4333 12.0923 3.85914 11.723L9.68116 6.66816C10.1063 6.29889 10.1063 5.70048 9.68116 5.33121L3.85914 0.276953Z" />
  </svg>
)

IconChevron.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default IconChevron
