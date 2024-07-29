import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const body = await request.json();
    const total = parseInt(Math.round(body.total * 100),10);
    if (!body.itineraryId) {
      return NextResponse.json({ message: 'Missing itinerary_id', ok: false }, { status: 400 });
    }

    const params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Perfumify',
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      metadata: {
        itinerary_id: body.itineraryId,
      },
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/Pages/ProductListing`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ result: checkoutSession, ok: true }, { status: 200 });

  } catch (error) {
    console.error(error);
    // Return error response
    return NextResponse.json({ message: 'something went wrong', ok: false }, { status: 500 });
  }
}
