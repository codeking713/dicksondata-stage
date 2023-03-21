import PropTypes from 'prop-types'

const IconSearchHeader = ({className, fill}) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.56834 20.3656L6.08611 14.8474C5.1486 13.3549 4.60448 11.5908 4.60448 9.69756C4.60448 4.34143 8.94652 0 14.3024 0C19.6584 0 24 4.34143 24 9.69756C24 15.0539 19.6586 19.3949 14.3024 19.3949C12.2421 19.3949 10.3338 18.7508 8.76346 17.6563L3.31136 23.1088C2.93252 23.4872 2.43588 23.6757 1.93985 23.6757C1.44321 23.6757 0.947182 23.4872 0.567734 23.1088C-0.189344 22.3509 -0.189344 21.1232 0.56834 20.3656ZM14.3024 16.253C17.9226 16.253 20.8575 13.3183 20.8575 9.69796C20.8575 6.07764 17.9226 3.14268 14.3024 3.14268C10.6821 3.14268 7.74735 6.07764 7.74735 9.69796C7.74735 13.3183 10.6821 16.253 14.3024 16.253Z"
      fill={fill}
    />
  </svg>
)

IconSearchHeader.defaultProps = {
  className: null,
  fill: '#000000'
}

IconSearchHeader.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default IconSearchHeader
