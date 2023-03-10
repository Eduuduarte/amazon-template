import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectItems } from '../slices/basketSlice';
import { ProductType } from '../types/Product';
import axios from 'axios';
import getStripe from '../libs/getStripe';
import { useFormater } from '../libs/useFormater';

const checkout = () => {
    const items: ProductType[] = useSelector(selectItems);
    const total = items.reduce((total, item) => total + item.price, 0);
    const { data: session } = useSession();
    const formatter = useFormater();

    const createCheckoutSession = async () => {
        const stripe = await getStripe();
        console.log(stripe);

        // Call the beckend to create a checkout session...
        const checkoutSession = await axios.post('/api/create-checkout-session', 
            {
                items: items,
                email: session?.user?.email
            }
        )

        // Redirect user/customer to Stripe Checkout
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result?.error) alert(result.error.message);
    }

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
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? "Your Amazon Basket is empty" : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                product={item}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 &&
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                                <span className='font-bold'>R$ {formatter.formtPrice(total)}</span>
                            </h2>

                            <button
                                disabled={!session}
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300'}`}
                                role="link"
                                onClick={createCheckoutSession}
                            >
                                {!session ? "Sign in to checkout" : 'Proceed to checkout'}
                            </button>
                        </>
                    }
                </div>
            </main>

        </div>
    )
}

export default checkout;