



import { Navigate, Outlet } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

function PrivateRoute() {

  const isAuth = useIsAuthenticated();
  return (

     isAuth ? <Outlet/> : <Navigate to="/login" />

    
  ) 
}

export default PrivateRoute
