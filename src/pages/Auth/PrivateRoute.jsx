// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../routes/RouterConfig';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ? children : <Navigate to={ROUTES.Login} />;
};

export default PrivateRoute;
