import React from 'react';
import { Product } from '../types/Product';

type Props = {
    products: Product[];
}

const ProductFeed = ({products}: Props) => {
  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  )
}

export default ProductFeed
