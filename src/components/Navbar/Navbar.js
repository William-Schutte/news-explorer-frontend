import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import CurrentUserContext from '../../utils/CurrentUserContext';
import { NAVBAR_MOBILE_WIDTH } from '../../utils/configData.json'


const Navbar = ({ alt, handlePopup, handleSignOut, isOpen }) => {
  const user = React.useContext(CurrentUserContext);

  const [width, setWidth] = React.useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  });

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleMobilePopup = () => {
    handleMenu();
    handlePopup();
  }

  return (
    <nav className={`navbar ${alt ? `navbar_alt` : ``} ${isMenuOpen}`}>
      <NavLink className={`navbar__logo ${(alt && !isMenuOpen) ? `navbar__color_alt` : ``}`} to="/">NewsExplorer</NavLink>
      {(width > NAVBAR_MOBILE_WIDTH) && (
        <>
          <NavLink exact to="/" className="navbar__link" activeClassName={`${alt ? `navbar__link_active_alt` : `navbar__link_active`}`}>
            <p className={`navbar__link-text ${alt && `navbar__color_alt`}`}>Home</p>
          </NavLink>
          {user != null &&
            <NavLink exact to="/savedNews" className="navbar__link" activeClassName={`${alt ? `navbar__link_active_alt` : `navbar__link_active`}`}>
              <p className={`navbar__link-text ${alt && `navbar__color_alt`}`}>Saved Articles</p>
            </NavLink>
          }
          {user != null ?
            <button className={`navbar__user ${alt && `navbar__user_alt`}`} onClick={handleSignOut}>{user.name}<i className="navbar__user-icon fas fa-sign-out-alt"></i></button>
            : <button className={`navbar__signin ${alt && `navbar__user_alt`}`} onClick={handlePopup}>Sign In</button>
          }
        </>
      )}

      {(width <= NAVBAR_MOBILE_WIDTH) && (
        <>
          {isOpen ? <button className={`navbar__menu-icon ${alt && `navbar__color_alt`}`} onClick={handlePopup}><i className="fas fa-times" /></button>
          : <button className={`navbar__menu-icon ${alt && `navbar__color_alt`}`} onClick={handleMenu}><i className="fas fa-equals" /></button>}
          <div className={`navbar__filter ${isMenuOpen ? `navbar__filter_active` : ``}`} />
          <menu className={`navbar__menu ${isMenuOpen ? `navbar__menu_open` : ``}`}>
            <Link exact="true" to="/" className="navbar__menu-link">
              <p className={`navbar__menu-link-text`}>Home</p>
            </Link>
            {user != null &&
              <Link exact="true" to="/savedNews" className="navbar__menu-link">
                <p className={`navbar__menu-link-text`}>Saved Articles</p>
              </Link>}
            {user != null ?
              <button className={`navbar__user navbar__menu-user`} onClick={handleSignOut}>{user.name}<i className="navbar__user-icon fas fa-sign-out-alt"></i></button>
              : <button className={`navbar__signin navbar__menu-user`} onClick={handleMobilePopup}>Sign In</button>}
          </menu>
        </>
      )}

    </nav>
  )
}

export default Navbar
