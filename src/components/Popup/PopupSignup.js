import React, { useCallback } from 'react'

const PopupSignup = ({ changePopupType, onSubmit, regFail }) => {
  const [values, setValues] = React.useState({ email: '', password: '', username: '' });
  const [errors, setErrors] = React.useState();
  const [isValid, setIsValid] = React.useState(false);

  function handleChangePopup() {
    resetForm();
    changePopupType('signin');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
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
    (newValues = { email: '', password: '', username: '' }, newErrors = {}, newIsValid = false) => {
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
        <input className="popup__input" type="email" name="email" value={values.email} placeholder="Enter email" minLength="7" required onChange={handleChange}></input>
        <p className="popup__span">{(errors && errors.email) && "Invalid email address"}</p>

        <label className="popup__label">Password</label>
        <input className="popup__input" type="password" name="password" value={values.password} placeholder="Enter password" minLength="5" required onChange={handleChange}></input>
        <p className="popup__span">{(errors && errors.password) && "Password must be at least 5 characters"}</p>


        <label className="popup__label">Username</label>
        <input className="popup__input" type="text" name="username" value={values.username} placeholder="Enter your username" minLength="2" required onChange={handleChange}></input>
        <p className="popup__span">{(errors && errors.username) && "Enter your name"}</p>

        <p className="popup__span_submit">{regFail && "There was an error with registration."}</p>

        <button className={`popup__submit ${!isValid && `popup__submit_inactive`}`} disabled={!isValid} onClick={handleSubmit}>Sign up</button>
      </form>
      <p className="popup__alternative">or&nbsp;<span className="popup__other-link" onClick={handleChangePopup}>Sign in</span></p>
    </>
  )
}

export default PopupSignup
