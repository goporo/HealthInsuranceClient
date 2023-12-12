import React from 'react'
import { Link } from 'react-router-dom';

const renderProductItem = (product) => {
    const { id, name, avatar } = product;
    return (
        <Link to={`product/${id}`}>
            <div className='h-28 bg-white flex flex-row p-4 gap-2'>
                <div className='flex-shrink-0'>
                    <img src={avatar} alt="logo" className='h-16 min-w-16 min-w-16' />
                </div>
                <div className=''>
                    <div className='text-lg font-bold'>
                        {name ?? "Life Vantage"}
                    </div>
                    <p className='line-clamp-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto modi eligendi blanditiis facere distinctio reiciendis, inventore obcaecati autem sed assumenda. Ad consequatur eum saepe quas, dolorum rerum voluptatem possimus quasi aecati autem shred res?</p>
                </div>
            </div>
        </Link>
    )
}

const ProductItem = ({
    response,
    fetchState = false,
}) => {
    // const { pathname } = useRouter();

    return (
        <>
            {response.map((product, idx) =>
                renderProductItem(product, idx)
            )}
        </>
    )
}

export default ProductItem