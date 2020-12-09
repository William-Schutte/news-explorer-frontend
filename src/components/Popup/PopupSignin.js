import React from 'react'

const PopupSignin = ({ changePopupType }) => {
  function handleChangePopup() {
    changePopupType('signup')
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <>
      <h3 className="popup__title">Sign in</h3>
        <form className="popup__form">
          <label className="popup__label">Email</label>
          <input className="popup__input" type="email" placeholder="Enter email" minLength="7" required></input>
          <span className="popup__span"></span>

          <label className="popup__label">Password</label>
          <input className="popup__input" type="password" placeholder="Enter password" minLength="5" required></input>
          <span className="popup__span"></span>

          <button type="submit" className="popup__submit popup__submit_inactive" disabled onClick={handleSubmit}>Sign in</button>
        </form>
        <p className="popup__alternative">or&nbsp;<span className="popup__other-link" onClick={handleChangePopup}>Sign up</span></p>
    </>
  )
}

export default PopupSignin
