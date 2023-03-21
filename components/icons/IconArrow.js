import PropTypes from 'prop-types'

const IconArrow = ({className, fill}) => (
  <svg
    width="10px"
    height="6px"
    viewBox="0 0 10 6"
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M0.23079,1.3944 C-0.07693,1.075 -0.07693,0.55851 0.23079,0.23913 C0.53852,-0.07971 1.03719,-0.07971 1.34491,0.23913 L4.9997,4.0286 L8.6551,0.23913 C8.9628,-0.07971 9.4615,-0.07971 9.7692,0.23913 C10.0769,0.55851 10.0769,1.075 9.7692,1.3944 L5.5568,5.7609 C5.2491,6.0797 4.7504,6.0797 4.4427,5.7609 L0.23079,1.3944 Z"
        id="path-arrow"
      ></path>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <mask id="mask-2" fill={fill}>
        <use xlinkHref="#path-arrow"></use>
      </mask>
      <use fill={fill} xlinkHref="#path-arrow"></use>
    </g>
  </svg>
)

IconArrow.defaultProps = {
  className: null,
  fill: '#3BAEFA'
}

IconArrow.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default IconArrow
