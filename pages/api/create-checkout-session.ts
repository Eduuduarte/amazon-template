import { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../types/Product";
import Stripe from "stripe";
import { useFormater } from "../../libs/useFormater";

// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {items, email} = req.body;
    const formatter = useFormater();

    const products: ProductType[] = items;

    const transformedItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map(product => ({
        quantity: 1,
        price_data: {
            currency: 'brl',
            unit_amount: parseInt(formatter.formtPrice(product.price)) * 100,
            product_data: {
                name: product.title,
                images: [product.image],
                description: product.description
            },
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
            {shipping_rate: 'shr_1MLx47Jib7kyhk9dm92YRFqd'},
        ],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA', 'PT', 'BR']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url:  `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(products.map(product => product.image))
        }
    });

    res.status(200).json({ id: session.id });
}