import React from 'react'
import './Popup.css'

const Popup = () => {
  return (
    <div className="popup popup_open">
      <div className="popup__container">
        <button className="popup__close"></button>
        <h3 className="popup__title">Sign In</h3>
        <label className="popup__label">Email</label>
        <input className="popup__input" type="email" required></input>
        <span className="popup__span"></span>

        <label className="popup__label">Password</label>
        <input className="popup__input" type="password" required></input>
        <span className="popup__span"></span>

        <button className="popup__button">Sign in</button>
        <p className="popup__alternative">or&nbsp;<a className="popup__other-link" href="#home">Sign up</a></p>
      </div>
    </div>
  )
}

export default Popup
