import PropTypes from 'prop-types'

const IconHeadphones = ({className, fill}) => (
  <svg
    className={className}
    width="23px"
    height="26px"
    viewBox="0 0 23 26"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" fill="none" fillRule="evenodd">
      <g
        transform="translate(1.000000, 1.000000)"
        fill={fill}
        fillRule="nonzero"
      >
        <path d="M16.1719,9.84375 C17.335,9.84375 18.2812,10.79 18.2812,11.9531 L18.2812,19.0781 C18.2812,21.0165 16.704,22.5938 14.7656,22.5938 L12.5267,22.5938 C12.2355,23.4104 11.4623,24 10.5469,24 C9.3837,24 8.4375,23.0538 8.4375,21.8906 C8.4375,20.7275 9.3837,19.7812 10.5469,19.7812 C11.4623,19.7812 12.2355,20.3708 12.5267,21.1875 L14.7656,21.1875 C15.7174,21.1875 16.5144,20.55 16.7762,19.6824 C16.5835,19.7406 16.3833,19.7812 16.1719,19.7812 C15.0087,19.7812 14.0625,18.835 14.0625,17.6719 L14.0625,11.9531 C14.0625,10.79 15.0087,9.84375 16.1719,9.84375 Z M4.92188,9.84375 C6.08503,9.84375 7.03125,10.79 7.03125,11.9531 L7.03125,17.6719 C7.03125,18.835 6.08503,19.7812 4.92188,19.7812 C3.75872,19.7812 2.8125,18.835 2.8125,17.6719 L2.8125,11.9531 C2.8125,10.79 3.75872,9.84375 4.92188,9.84375 Z M1.46616,11.3609 C1.43302,11.5544 1.40625,11.7503 1.40625,11.9531 L1.40625,17.6719 C1.40625,17.8747 1.43302,18.0706 1.46616,18.2641 C0.61875,17.9902 0,17.2031 0,16.2656 L0,13.3594 C0,12.4219 0.61875,11.6348 1.46616,11.3609 Z M19.6276,11.3609 C20.475,11.6348 21.0938,12.4219 21.0938,13.3594 L21.0938,16.2656 C21.0938,17.2031 20.475,17.9902 19.6276,18.2641 C19.6607,18.0706 19.6875,17.8747 19.6875,17.6719 L19.6875,11.9531 C19.6875,11.7503 19.6607,11.5544 19.6276,11.3609 Z M10.5469,0 C16.3628,0 21.0938,4.731 21.0938,10.5469 L21.0938,10.5648 C20.6748,10.2477 20.1901,10.0155 19.6553,9.91162 C19.3267,5.16802 15.3725,1.40625 10.5469,1.40625 C5.72128,1.40625 1.76709,5.16802 1.43845,9.91167 C0.90361,10.0156 0.41892,10.2477 0,10.5648 L0,10.5469 C0,4.731 4.731,0 10.5469,0 Z"></path>
      </g>
    </g>
  </svg>
)

IconHeadphones.defaultProps = {
  className: null,
  fill: '#3BAEFA'
}

IconHeadphones.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default IconHeadphones