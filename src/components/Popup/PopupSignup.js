import React from 'react'

const PopupSignup = ({ changePopupType }) => {
  function handleChangePopup() {
    changePopupType('signin')
  }

  return (
    <>
      <h3 className="popup__title">Sign up</h3>
        <form className="popup__form">
          <label className="popup__label">Email</label>
          <input className="popup__input" type="email" placeholder="Enter email" minLength="7" required></input>
          <span className="popup__span"></span>

          <label className="popup__label">Password</label>
          <input className="popup__input" type="password" placeholder="Enter password" minLength="5" required></input>
          <span className="popup__span"></span>


          <label className="popup__label">Username</label>
          <input className="popup__input" type="text" placeholder="Enter your username" minLength="2" required></input>
          <span className="popup__span"></span>

          <button className="popup__submit popup__submit_inactive">Sign up</button>
        </form>
        <p className="popup__alternative">or&nbsp;<span className="popup__other-link" onClick={handleChangePopup}>Sign in</span></p>
    </>
  )
}

export default PopupSignup
