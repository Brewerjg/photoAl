import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './userContext'

const ProtectedRoutes = () => {
    const { loggedInUser } = useContext(UserContext);
    console.log(loggedInUser)
  
    return (

      loggedInUser ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      )
    );
  };

export default ProtectedRoutes