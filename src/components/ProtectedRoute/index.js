import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookie.get('jwt_token');

  // 1. If no token, redirect to login using Navigate
  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  // 2. If token exists, render the child routes (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;