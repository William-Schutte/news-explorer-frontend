import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; 2020 William Schutte, Powered by News API</p>
      <a className="footer__link" href="#home">Home</a>
      <a className="footer__link" href="https://practicum.yandex.com/web/">Practicum by Yandex</a>
      <a className="footer__icon" href="https://github.com/William-Schutte" target="_blank" rel="noreferrer" ><i class="fab fa-github"></i></a>
      <a className="footer__icon" href="https://www.linkedin.com/in/william-schutte/" target="_blank" rel="noreferrer"><i class="fab fa-linkedin"></i></a>
    </footer>
  )
}

export default Footer
