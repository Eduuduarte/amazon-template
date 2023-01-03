import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as admin from 'firebase-admin';
import { Session, DefaultSession } from 'next-auth'

// Secure a connection to Firebase from the beckend
const serviceAccount = require('../../permissons.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
    return app.firestore().collection('users').doc(session.metadata.email).collection('ordens').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping /100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify that the EVENT posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log((error as Error).message)
            return res.status(400).send(`Webhook error: ${(error as Error).message}`);
        }

        //Handle the checkout .session.completed event
        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Fulfill the order...
            return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`Webhook Error: ${(err as Error).message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}