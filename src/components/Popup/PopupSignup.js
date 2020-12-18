import React, { useCallback } from 'react'

const PopupSignup = ({ changePopupType }) => {
  const [values, setValues] = React.useState({ email: '', password: '', username: '' });
  const [errors, setErrors] = React.useState();
  const [isValid, setIsValid] = React.useState(false);
  
  function handleChangePopup() {
    changePopupType('signin')
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(values);
    resetForm();
  }

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = { email: '', password: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return (
    <>
      <h3 className="popup__title">Sign up</h3>
        <form className="popup__form">
          <label className="popup__label">Email</label>
          <input className="popup__input" type="email" placeholder="Enter email" minLength="7" required></input>
          <p className="popup__span"></p>

          <label className="popup__label">Password</label>
          <input className="popup__input" type="password" placeholder="Enter password" minLength="5" required></input>
          <p className="popup__span"></p>


          <label className="popup__label">Username</label>
          <input className="popup__input" type="text" placeholder="Enter your username" minLength="2" required></input>
          <p className="popup__span"></p>

          <button className="popup__submit popup__submit_inactive">Sign up</button>
        </form>
        <p className="popup__alternative">or&nbsp;<span className="popup__other-link" onClick={handleChangePopup}>Sign in</span></p>
    </>
  )
}

export default PopupSignup
