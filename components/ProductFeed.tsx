import React from 'react';
import { ProductType } from '../types/Product';
import Product from './Product';

type Props = {
    products: ProductType[];
}

const ProductFeed = ({products}: Props) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4'>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default ProductFeed;
