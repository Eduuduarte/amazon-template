import Image from 'next/image';
import React, { useState } from 'react';
import { ProductType } from '../types/Product';
import { StarIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectItems } from '../slices/basketSlice';
import { useFormater } from '../libs/useFormater';

type Props = {
    product: ProductType;
}

const CheckoutProduct = ({product}: Props) => {
    const [rating, setRating] = useState(
        Math.round(product.rating.rate)
    );
    const dispatch = useDispatch();
    const formatter = useFormater();
    const items: ProductType[] = useSelector(selectItems);
    
    const addItemToBasket = () => {
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        const index = items.findIndex(item => item.id === product.id);

        let newBasket: ProductType[] = [...items];
        console.log(newBasket);

        if(index >= 0) {
            newBasket.splice(index, 1);
        } else {
            `Cant remove product id (id: ${product.id}) as its not in basket)`
        }

        dispatch(removeFromBasket(newBasket));
    }

  return (
    <div className='grid grid-cols-5'>
        <Image src={product.image} alt="" height={200} width={200}/>
        
        {/* middle */}
        <div className='col-span-3 mx-5'>
            <p>{product.title}</p>
            <div className='flex'>
                {Array(rating).fill(1).map((_, i) => (
                    <StarIcon className='h-5 text-yellow-500' key={i}/>
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-3'>{product.description}</p>
            <p>R$ {formatter.formtPrice(product.price)}</p>
            <div className='flex items-center space-x-2'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="" loading='lazy'/>
                <div className='text-xs text-gray-500'>FREE Next-day Delivery</div>
            </div>
        </div>
        {/* Right add/remove buttons */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>Add to Basket</button>
            <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct;