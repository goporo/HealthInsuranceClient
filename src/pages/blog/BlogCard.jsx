import React from 'react'

import { motion, useAnimation } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import UiImage from 'components/common/ui/UiImage/UiImage'

const BlogCard = ({ img, title, subTitle, desc, path }) => {
    return (
        <Link
            to={path}
            className='relative group'
        >
            <div className=' w-[366px] h-[546px] overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-200'>
                <UiImage src={img} alt={title} width={366} height={244} />

                {subTitle && <div className='absolute top-0 right-0 font-bold text-[14px] p-[14px] rounded-lg bg-white'>{subTitle}</div>}
                <div className="px-10 pt-[30px] pb-[36px]">
                    <div className=' font-semibold text-[24px] leading-8'>{title}</div>
                    <p className='font-light mt-3 text-ellipsis overflow-hidden h-[120px]'>{desc}</p>
                </div>
            </div>

            <button
                className='bg-primary overflow-hidden w-[40px] h-[40px] flex items-center justify-center absolute right-8 -bottom-5 rounded-full text-white transform origin-center'
            >
                <div className='group-hover:translate-x-20 duration-500 transition-all flex flex-row gap-x-16'>
                    <FontAwesomeIcon icon={faChevronRight} className='text-white w-4 h-4 ' />
                    <FontAwesomeIcon icon={faChevronRight} className='text-white w-4 h-4 ' />
                    <FontAwesomeIcon icon={faChevronRight} className='text-white w-4 h-4 ' />
                </div>
            </button>
        </Link>
    )
}

export default BlogCard