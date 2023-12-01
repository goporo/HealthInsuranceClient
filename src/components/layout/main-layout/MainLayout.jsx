import React from 'react'
import Header from '../header/Header'
import SideBar from '../side-bar/SideBar'

const MainLayout = ({ children }) => {
    return (
        <div className=''>
            <div className="fixed left-0 top-0">
                <SideBar />
            </div>
            <div className='flex-1 h-screen relative left-[14.625rem]'>
                <Header />
                <div className="bg-slate-700 h-full">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default MainLayout