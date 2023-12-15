import MainLayout from 'components/layout/main-layout/MainLayout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutRoute = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}

export default LayoutRoute