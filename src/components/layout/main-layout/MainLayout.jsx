import React from 'react'
import Header from '../header/Header'
import SideBar from '../side-bar/SideBar'

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="fixed left-0 top-0 z-10 h-screen">
                <SideBar />
            </div>

            <div className='pl-[14.625rem]'>
                <div className="fixed top-0 w-[calc(100vw-14.625rem)]">
                    <Header />
                </div>
                <div className="bg-slate-100 flex-1 pt-16 h-screen">
                    <div className="p-4">

                        {children}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainLayout