import clsx from 'clsx';
import React from 'react'
import { Link, Router, useLocation } from 'react-router-dom';

const navItems = [
    {
        title: 'Dashboard',
        //   Icon: SVGHome,
        path: '/',
    },
    {
        title: 'About',
        //   Icon: SVGFolderCode,
        path: '/about',
    },
    {
        title: 'History',
        //   Icon: SVGClock,
        path: '/history',
    },
    {
        title: 'Policy',
        //   Icon: SVGInformation,
        path: '/policy'
    },
];

const NavItem = (props) => {
    const { title, icon, path, isActive = false } = props;
    const activeClassName = 'bg-blue-primary text-white';
    const notActiveClassName = 'bg-white text-black';

    return (
        <Link to={path || '/#'}>
            <div className={clsx(
                'flex h-11 justify-center items-center cursor-pointer hover:bg-blue-primary hover:text-white',
                isActive ? activeClassName : notActiveClassName
            )}>
                <div className=" ">{title}</div>
            </div>
        </Link>
    )
}

const SideBar = () => {

    const CheckIsActive = (path, rootPath) => {
        const location = useLocation()
        const currentPath = location.pathname;

        if (currentPath === path) {
            return true;
        }

        if (rootPath) {
            return currentPath.startsWith(rootPath);
        }

        return false;
    };

    return (
        //bg-gradient-to-br from-blue-light to-blue-darker
        <nav className="w-[14.625rem] h-screen">
            <div>
                <img src="/assets/images/logo.png" alt="logo" />
            </div>
            {navItems.map((item, index) => {
                const isActive = CheckIsActive(item.path, item.rootPath);
                return (<NavItem key={index} isActive={isActive} path={item.path} title={item.title} />)
            }
            )}
        </nav>
    )
}

export default SideBar