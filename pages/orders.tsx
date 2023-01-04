import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import Header from '../components/Header'
import db from '../firabase';
import moment from 'moment';
import { OrdersType } from '../types/Orders';
import Order from '../components/Order';

const orders = (data: Props) => {
    const { data: session } = useSession();

    return (
        <div>
            <Header />

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Ordens</h1>

                {session ?
                    (<h2>{data.orders.length} orders</h2>)
                    :
                    (<h2>Please sign in to see your orders</h2>)
                }

                {session &&
                    <div className='mt-5  space-y-4'>
                        {data.orders.map(order => (
                            <Order order={order} key={order.id} />
                        ))}
                    </div>
                }

            </main>
        </div>
    )
}

export default orders;

type Props = {
    orders: OrdersType[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

    // Get the users logged in credentials
    const session = await getSession(context);

    const email = session?.user?.email

    if (!session) {
        return {
            props: {}
        }
    }

    // Firebase DB
    const stripeOrders = await db.collection('users')
        .doc(session.user?.email as string)
        .collection('ordens')
        .orderBy('timestamp', "desc").get();

    // Stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props: {
            orders,
        }
    }
}