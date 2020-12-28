import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const MOBILE_WIDTH = 700;
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  });

  return (
    <footer className="footer">
      {width > MOBILE_WIDTH && 
        <>
          <p className="footer__copyright">&#169; 2020 William Schutte, Powered by News API</p>
          <NavLink exact to="/" className="footer__link">Home</NavLink>
          <a className="footer__link" href="https://practicum.yandex.com/web/" target="_blank" rel="noreferrer">Practicum by Yandex</a>
          <a className="footer__icon" href="https://github.com/William-Schutte" target="_blank" rel="noreferrer" ><i className="fab fa-github"></i></a>
          <a className="footer__icon" href="https://www.linkedin.com/in/william-schutte/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
        </>
      }
      {width <= MOBILE_WIDTH && 
        <>
          <div className="footer__mobile">
            <div className="footer__links">
              <NavLink exact to="/" className="footer__link">Home</NavLink>
              <a className="footer__link" href="https://practicum.yandex.com/web/" target="_blank" rel="noreferrer">Practicum by Yandex</a>
            </div>
            <a className="footer__icon" href="https://github.com/William-Schutte" target="_blank" rel="noreferrer"><i className="fab fa-github"/></a>
            <a className="footer__icon" href="https://www.linkedin.com/in/william-schutte/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"/></a>
          </div>
          <p className="footer__copyright">&#169; 2020 William Schutte, Powered by News API</p>
        </>
      }
    </footer>
  )
}

export default Footer
