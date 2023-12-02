import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../routes/RouterConfig';
import MainLayout from '../../components/layout/main-layout/MainLayout';
import authService from '../../services/authService';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        authService.handleAutoLogin(dispatch);
    }, [dispatch]);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ?
        <MainLayout>
            {children}
        </MainLayout>
        : <Navigate to={ROUTES.Login} />;
};

export default PrivateRoute;
