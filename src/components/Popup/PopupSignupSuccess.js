import React from 'react'

const PopupSignupSuccess = ({ changePopupType }) => {
  function handleChangePopup() {
    changePopupType('signin')
  }

  return (
    <>
      <h3 className="popup__title">Registration sucessfully completed!</h3>
      <p className="popup__other-link popup__success" onClick={handleChangePopup}>Sign in</p>
    </>
  )
}

export default PopupSignupSuccess
