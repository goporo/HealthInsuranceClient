// Router.js
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import { ROUTES } from './RouterConfig'
import Login from '../pages/Auth/Login'
import ProtectedRoute from '../pages/Auth/ProtectedRoute'
import NotFound from '../pages/404/NotFound'
import ProductDetail from 'pages/Product/ProductDetail'
import MyInsurance from 'pages/MyInsurance/MyInsurance'
import LayoutRoute from 'pages/Auth/LayoutRoute'
import KhiCanMinhCoNhau from 'pages/SpecialEvent/KhiCanMinhCoNhau'
import BlogList from 'pages/blog/BlogList'
import QuyTrinhBoiThuong from 'pages/blog/BaiVietNoiBat/QuyTrinhBoiThuong'
import CacDieuKhoanLoaiTru from 'pages/blog/BaiVietNoiBat/CacDieuKhoanLoaiTru'

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path={ROUTES.Login} element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* protected route with layout*/}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.MyInsurance} element={<MyInsurance />} />
      </Route>

      {/* public route with layout */}
      <Route element={<LayoutRoute />}>
        <Route path={ROUTES.Home} element={<Home />} />
        <Route path={ROUTES.SpecialEvent} element={<KhiCanMinhCoNhau />} />
        <Route path={ROUTES.BlogBaiVietNoiBat} element={<BlogList />} />
        <Route path={ROUTES.BlogQuyTrinhBoiThuong} element={<QuyTrinhBoiThuong />} />
        <Route path={ROUTES.BlogCacDieuKhoanLoaiTru} element={<CacDieuKhoanLoaiTru />} />

        <Route path={ROUTES.Product} element={<ProductDetail />} />
      </Route>

    </Routes>
  )
}

export default Router
