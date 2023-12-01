import clsx from 'clsx';
import React from 'react'

const NavItem = (props) => {
    const { title, Icon, path, isActive = false, expanded } = props;
    const activeClassName = 'bg-blue-primary text-white';
    const notActiveClassName = 'bg-white text-black';

    return (
        <div className={clsx(
            'flex h-11 justify-center items-center cursor-pointer hover:bg-blue-primary hover:text-white',
            isActive ? activeClassName : notActiveClassName
        )}>
            <div className=" ">{title}</div>
        </div>
    )
}

const SideBar = () => {
    return (
        //bg-gradient-to-br from-blue-light to-blue-darker
        <div className="w-[14.625rem] h-screen">
            <div>
                <img src="/assets/images/logo.png" alt="logo" />
            </div>
            {[1, 0, 0, 0].map((item, index) => (
                <NavItem key={index} isActive={item === 1} title='Nav Item' />
            )
            )}
        </div>
    )
}

export default SideBar