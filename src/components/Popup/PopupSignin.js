import React, { useCallback } from 'react'

const PopupSignin = ({ changePopupType, onSubmit }) => {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState();
  const [isValid, setIsValid] = React.useState(false);

  function handleChangePopup() {
    resetForm();
    changePopupType('signup');
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
    (newValues = { email: '', password: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return (
    <>
      <h3 className="popup__title">Sign in</h3>
      <form className="popup__form">
        <label className="popup__label">Email</label>
        <input className="popup__input" name="email" value={values.email} type="email" placeholder="Enter email" minLength="7" required onChange={handleChange}></input>
        <p className="popup__span">{(errors && errors.email) && "Invalid email address"}</p>

        <label className="popup__label">Password</label>
        <input className="popup__input" name="password" value={values.password} type="password" placeholder="Enter password" minLength="5" required onChange={handleChange}></input>
        <p className="popup__span">{(errors && errors.password) && "Password must be at least 5 characters"}</p>
        <button type="submit" className={`popup__submit ${!isValid && `popup__submit_inactive`}`} disabled={!isValid} onClick={handleSubmit}>Sign in</button>
      </form>
      <p className="popup__alternative">or&nbsp;<span className="popup__other-link" onClick={handleChangePopup}>Sign up</span></p>
    </>
  )
}

export default PopupSignin



// hook for form control
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

// hook for form control and form validation
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}