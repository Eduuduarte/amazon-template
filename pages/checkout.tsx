import Head from 'next/head';
import React from 'react'
import Header from '../components/Header';

const checkout = () => {
  return (
    <div className='bg-gray-100'>
        <Head>
        <title>Amazon 2.0 - Checkout</title>
      </Head>
        <Header />
    </div>
  )
}

export default checkout;