import React from 'react'

const SideBar = () => {
    return (
        <div className="w-[14.625rem] h-screen bg-gradient-to-br from-blue-light to-blue-darker">
            {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex h-11 justify-center items-center hover:opacity-80 cursor-pointer">
                    <div className=" text-white ">abc</div>
                </div>
            )
            )}
        </div>
    )
}

export default SideBar