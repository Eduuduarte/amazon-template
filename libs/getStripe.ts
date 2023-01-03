import { loadStripe } from '@stripe/stripe-js';

let stripePromise: any;
const public_key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

const getStripe = async () => {
    if(!stripePromise) {
        stripePromise = await loadStripe(public_key);
    }

    return stripePromise;
}

export default getStripe;