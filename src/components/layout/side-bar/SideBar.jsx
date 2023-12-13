import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faRightFromBracket, faUser, faX } from '@fortawesome/free-solid-svg-icons';

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ROUTES } from 'routes/RouterConfig';

const ExpandTransitionTime = 300;

const navItems = [
    {
        title: 'Khi Cần mình có NHAU',
        icon: null,
        items: [{ path: ROUTES.Home, title: 'Chiến dịch thương hiệu: Khi CẦN mình có NHAU' }],
    },
    {
        title: 'Blog',
        icon: null,
        items: [
            { path: ROUTES.BlogBaiVietNoiBat, title: 'Bài Viết Nổi Bật' },
            { path: ROUTES.BlogKientThucBaoHiem, title: 'Kiến Thức Bảo Hiểm' },
            { path: ROUTES.BlogSucKhoeTheChat, title: 'Sức Khỏe Thể Chất' },
            { path: ROUTES.BlogChamSocTinhThan, title: 'Chăm Sóc Tinh Thần' },
            { path: ROUTES.BlogQuanLyTaiChinh, title: 'Quản Lý Tài Chính' },
        ],
    },
    {
        title: 'Sản phẩm bảo hiểm',
        icon: null,
        items: [{ path: ROUTES.BlogBaiVietNoiBat, title: 'Bài Viết Nổi Bật' }],
    },
    {
        title: 'Chăm sóc khách hàng',
        icon: null,
        items: [{ path: ROUTES.BlogBaiVietNoiBat, title: 'Bài Viết Nổi Bật' }],
    },
    {
        title: 'Cơ hội nghề nghiệp',
        icon: null,
        items: [{ path: ROUTES.BlogBaiVietNoiBat, title: 'Bài Viết Nổi Bật' }],
    },
    {
        title: 'Về Protector',
        icon: null,
        items: [{ path: ROUTES.BlogBaiVietNoiBat, title: 'Bài Viết Nổi Bật' }],
    },
];

const underLineActiveClassName = "w-full h-[5px] translate-y-[1px] rounded-lg bg-white absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 duration-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform";

const NavItem = (props) => {
    const { title, icon, isActive = false, handleNavClick } = props;

    return (
        <button onClick={handleNavClick}>
            <div className={clsx('group flex relative h-full justify-start gap-4 px-[10px] py-[20px] items-center cursor-pointer text-white text-[18px] font-semibold')}>
                {icon && <FontAwesomeIcon icon={icon} className="h-5 w-5 leading-[0px]" />}
                <div className="">{title}</div>
                <div className={underLineActiveClassName}></div>
                {isActive && <div className='w-full h-[5px] translate-y-[1px] rounded-lg bg-white absolute bottom-0 left-0 ' />}
            </div>
        </button>
    );
};

const SideBar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [isNavExpand, setIsNavExpand] = useState(false);
    const controls = useAnimation();

    const handleNavClick = (item) => {
        setIsNavExpand(!isNavExpand);
        if (activeItem !== item) {
            setTimeout(() => {
                setActiveItem(item);
                setIsNavExpand(true);
            }, ExpandTransitionTime);
        }
        setActiveItem(item);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 5;

            if (window.scrollY > scrollThreshold) {
                controls.start({ y: -92 });
                setIsNavExpand(false);

                // clean up
                setActiveItem(null);
            } else {
                controls.start({ y: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const CheckIsActive = (item) => {
        return item === activeItem;
    };

    return (
        <div className="min-w-[1166px] max-w-[1166px] ">
            <motion.div animate={controls}>

                <nav className="px-[33px] gap-4 rounded-lg relative min-h-[69px] shadow-sm bg-primary flex-row flex">
                    {navItems.map((item, index) => {
                        const isActive = CheckIsActive(item);
                        return <NavItem key={index} isActive={isActive} paths={item.paths} items={item.items} title={item.title} icon={item.icon} handleNavClick={() => handleNavClick(item)} />;
                    })}
                </nav>
            </motion.div>

            <AnimatePresence>
                {isNavExpand && activeItem && (
                    <motion.div
                        className="w-full px-2 bg-white pt-[46px] pb-[40px] shadow-sm origin-top grid lg:grid-cols-4 gap-y-8"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: ExpandTransitionTime / 1000, ease: 'easeInOut' }}
                    >
                        {activeItem.items.map((item, idx) => {
                            return (
                                <Link key={idx} to={item.path}>
                                    <div className=" w-[300px] px-4 flex flex-row items-end flex-1">
                                        <div className='text-[22px]'>
                                            {item.title}
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight} className='w-[16px] pb-2 pr-1 text-primary' />
                                    </div>

                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SideBar;
