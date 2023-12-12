// Router.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../pages/Auth/ProtectedRoute';
import NotFound from '../pages/404/NotFound';
import ProductDetail from 'pages/Product/ProductDetail';

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path={ROUTES.Login} element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* protected route */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.Home} element={<Home />} />
        <Route path={ROUTES.About} element={<About />} />
        {/* <Route path={ROUTES.Product} element={<ProductDetail />} /> */}

      </Route>


    </Routes>
  );
};

export default Router;
