import PropTypes from 'prop-types'

const IconEmail = ({color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
    <g clipPath="url(#clip0_1568_21555)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4515 0.0424222C11.5765 -0.0230778 11.7275 -0.0120778 11.8425 0.0694222C11.9575 0.151422 12.0165 0.290422 11.996 0.430422L10.621 9.68042C10.6045 9.78992 10.54 9.88742 10.445 9.94542C10.3855 9.98142 10.318 9.99992 10.25 9.99992C10.209 9.99992 10.168 9.99292 10.129 9.97992L4.88747 8.18842L10.0415 1.97892L3.38097 7.67392L0.253462 6.60492C0.111961 6.55642 0.0124612 6.42842 0.000961205 6.27842C-0.0100388 6.12892 0.0684613 5.98692 0.201461 5.91742L11.4515 0.0424222ZM4.375 11.125V8.806L6.40849 9.501L5.05199 11.347C4.97999 11.445 4.86699 11.5 4.75 11.5C4.711 11.5 4.6715 11.494 4.633 11.4815C4.479 11.4305 4.375 11.287 4.375 11.125Z"
        fill={color}
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_1568_21555">
        <rect width="12" height="12" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
)

IconEmail.propTypes = {
  color: PropTypes.string
}

IconEmail.defaulProps = {
  color: 'currentColor'
}

export default IconEmail
