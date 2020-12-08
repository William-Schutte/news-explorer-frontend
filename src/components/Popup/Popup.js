import React, { useState } from 'react'
import './Popup.css'
import exitIcon from '../../images/back.png'
import PopupSignin from './PopupSignin'
import PopupSignup from './PopupSignup'
import PopupSignupSuccess from './PopupSignupSuccess'

const Popup = ({ isOpen, handlePopup, popupType, changePopup }) => {
  const MOBILE_WIDTH = 550;
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  });

  return (
    <div className={`popup ${isOpen ? `popup_open` : ``}`}>
      <div className="popup__container">
        {width > MOBILE_WIDTH && <button className="popup__close" onClick={handlePopup}><img src={exitIcon} alt="Close Icon"/></button>}
        {popupType === 'signin' && <PopupSignin changePopupType={changePopup} />}
        {popupType === 'signup' && <PopupSignup changePopupType={changePopup} />}
        {popupType === 'success' && <PopupSignupSuccess changePopupType={changePopup} />}
      </div>
    </div>
  )
}

export default Popup
