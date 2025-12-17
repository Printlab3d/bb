import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { items, customerInfo, shipping } = JSON.parse(event.body);

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'pln',
                product_data: {
                    name: item.name,
                    images: item.image_url ? [`${process.env.URL}${item.image_url}`] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        if (shipping > 0) {
            lineItems.push({
                price_data: {
                    currency: 'pln',
                    product_data: { name: 'Dostawa' },
                    unit_amount: Math.round(shipping * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'blik', 'p24'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.URL}/Success`,
            cancel_url: `${process.env.URL}/Cart`,
            customer_email: customerInfo.email,
            metadata: {
                customer_name: customerInfo.name,
                delivery_address: customerInfo.address,
                delivery_city: customerInfo.city,
            },
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: session.url }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};