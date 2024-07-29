import Stripe from 'stripe';
import getRawBody from 'raw-body';
import NextCors from 'nextjs-cors';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const rawBody = await request.text();

    const sig = await request.headers.get('stripe-signature');
    
    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    console.log('event.type', JSON.stringify(event.type));

    if (event.type === 'checkout.session.completed') {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems) return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
