import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CurrentUserContext from '../../utils/CurrentUserContext';

const ProtectedRoute = (props) => {
  const user = useContext(CurrentUserContext);

  const redirectAction = () => {
    if (user) {
      return <>{props.children}</>
    } else {
      props.handlePopup();
      return <Redirect to="/" />;
    }
    
  }

  return (
    <Route>
      {redirectAction}
    </Route>
  )
}

export default ProtectedRoute
