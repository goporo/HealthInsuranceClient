import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import authService from '../../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartShopping, faMagnifyingGlass, faPhone, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../routes/RouterConfig';
import SideBar from '../side-bar/SideBar';
import UiButton from 'components/common/ui/UiButton/UiButton';

const Header = () => {
    const [isExpand, setIsExpand] = useState(false);
    const navigate = useNavigate();
    const controls = useAnimation();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 5;

            if (window.scrollY > scrollThreshold) {
                controls.start({ y: -92 });
            } else {
                controls.start({ y: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);

    return (
        <motion.div animate={controls}>

            <header className='z-10 h-[126px]  bg-white flex flex-col justify-start items-center px-6 shadow-[0_0_64px_rgba(0,0,0,.08)]'>
                <div className='min-w-[1200px] max-w-[1200px] min-h-[92px] flex flex-row justify-between items-center'>
                    <Link to={ROUTES.Home} className='flex flex-row gap-[2px]'>
                        <img src="/assets/images/logo.png" alt="logo" className='w-fit h-12' />
                    </Link>
                    <div className='flex flex-row items-center gap-6 text-[#1b365d] h-fit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='cursor-pointer' />
                        <FontAwesomeIcon icon={faPhone} className='cursor-pointer' />

                        <UiButton className='bg-none flex flex-row gap-2 items-center'>
                            <FontAwesomeIcon icon={faBagShopping} className='' />
                            <div className='font-bold italic text-sm whitespace-nowrap'>
                                Mua bảo hiểm trên ePro
                            </div>
                        </UiButton>

                        <div className='flex flex-row font-bold text-sm'>
                            <UiButton className='bg-white w-[110px] h-[36px] p-[5px] border-[2px] border-r-0 border-[#e5eaef] rounded-l-full italic'>Cá Nhân</UiButton>
                            <UiButton className='bg-none bg-[#e5eaef] w-[110px] h-[36px] p-[5px] border-[2px] border-l-0 border-[#e5eaef] rounded-r-full italic'>
                                <p className='opacity-50'>Doanh Nghiệp</p>
                            </UiButton>
                        </div>
                        <div className='h-[36px]'>
                            {
                                true ? <UiButton className='bg-white w-[110px] p-[5px] border-[2px] border-[#e5eaef] rounded-full italic font-bold text-sm'
                                    onClick={() => {
                                        navigate(ROUTES.Login);
                                    }}
                                >
                                    {'Đăng nhập'}
                                </UiButton> : <UiButton className='bg-white w-[110px] p-[5px] border-[2px] border-[#e5eaef] rounded-full italic font-bold text-sm'
                                    onClick={() => {
                                        authService.handleLogout(dispatch);
                                        navigate(ROUTES.Login);
                                    }}
                                >
                                    {'Đăng xuất'}
                                </UiButton>
                            }
                        </div>

                    </div>
                </div>
                <SideBar className='' />
            </header>
        </motion.div>
    );
};

export default Header;
