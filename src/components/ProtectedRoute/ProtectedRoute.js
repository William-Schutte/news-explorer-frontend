import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../App/App'

const ProtectedRoute = (props) => {
  const user = useContext(CurrentUserContext);

  return (
    <Route>
      {
        () => user ? <>{props.children}</> : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute