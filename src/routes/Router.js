// Router.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import Login from '../pages/Auth/Login';
import PrivateRoute from '../pages/Auth/PrivateRoute';
import NotFound from '../pages/404/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.Login} element={<Login />} />
      <Route path={ROUTES.Home} element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path={ROUTES.About} element={<PrivateRoute><About /></PrivateRoute>} />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
