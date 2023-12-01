import React, { useState } from 'react'

const Header = () => {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className='h-16 flex flex-row justify-between items-center px-6'>
            <div></div>
            <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsExpand(true)}
                onMouseLeave={() => setIsExpand(false)}
            >
                <img
                    className="[60px] w-[60px] rounded-full object-cover"
                    src={"https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912768/avatar-icon-md.png"}
                    alt="avatar"
                />
                {/* {isExpand && (
                    <div className="absolute top-full -right-6 w-44 pt-[26px] transition-all">
                        <div className="relative shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                            <div className="absolute bottom-full right-[20%] text-md leading-[0.7] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                                &#x25B2;
                            </div>
                            <div className="relative bg-white p-4">
                                <div
                                    role="button"
                                    onClick={navigateUserInforPage}
                                    className="mb-4 flex items-center"
                                >
                                    <div className="mr-2 w-4">
                                        <SVGUser></SVGUser>
                                    </div>
                                    <p>Profile Details</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-2 w-4">
                                        <SVGSignOut></SVGSignOut>
                                    </div>
                                    <p
                                        onClick={() => {
                                            authService.handleLogout();
                                        }}
                                    >
                                        Log Out
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Header