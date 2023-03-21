import PropTypes from 'prop-types'
import css from './mainnavtoggle.module.scss'

const MainNavToggle = ({handleClick, mobileMenuOpen}) => {
  return (
    <button
      className={css.menu}
      aria-controls="dapHeaderNav"
      aria-expanded={mobileMenuOpen}
      id="dapHeaderMenuToggle"
      onClick={handleClick}
    >
      <div
        className={
          mobileMenuOpen
            ? `${css.menu__hamburger} ${css['menu__hamburger--open']}`
            : css.menu__hamburger
        }
      >
        <span className={css.menu__hamburger__lines}></span>
      </div>
    </button>
  )
}

MainNavToggle.propTypes = {
  handleClick: PropTypes.func,
  mobileMenuOpen: PropTypes.bool.isRequired
}

export default MainNavToggle
