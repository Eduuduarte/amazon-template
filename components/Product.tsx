import React, { useState } from 'react'
import { ProductType } from '../types/Product';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

type Props = {
    product: ProductType;
}

const Product = ({ product }: Props) => {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(
        Math.round(product.rating.rate)
    );

    const [hasPrime, setHasPrime] = useState<number>(Math.random());

    const addItemToBasket = () => {
        dispatch(addToBasket(product))
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>

            <Image src={product.image} height={200} width={200} alt="" />

            <h4 className='my-3'>{product.title}</h4>
            <div className='flex'>
                {Array(rating).fill(1).map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>

            <p className='text-xs my-2 line-clamp-2'>{product.description}</p>
            <div className='mb-5'>{product.price}</div>


            <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                <div className='text-xs text-gray-500'>FREE Next-day Delivery</div>
            </div>


            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product;