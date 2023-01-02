import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import Header from '../components/Header';

const checkout = () => {
    return (
        <div className='bg-gray-100'>
            <Head>
                <title>Amazon 2.0 - Checkout</title>
            </Head>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} alt="" />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>Your shopping Basket</h1>
                    </div>
                </div>

                {/* Right */}
                <div></div>
            </main>

        </div>
    )
}

export default checkout;