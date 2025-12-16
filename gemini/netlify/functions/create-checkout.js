// netlify/functions/create-checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
    // Nagłówki dla CORS (żeby frontend mógł gadać z backendem)
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Obsługa pre-flight request (dla przeglądarek)
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const { items, customerInfo, shipping } = JSON.parse(event.body);

        // Tworzenie listy produktów
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

        // Dodanie kosztu wysyłki
        if (shipping > 0) {
            lineItems.push({
                price_data: {
                    currency: 'pln',
                    product_data: { name: 'Dostawa kurierska' },
                    unit_amount: Math.round(shipping * 100),
                },
                quantity: 1,
            });
        }

        /* UWAGA: BLIK i P24 wymagają włączenia w panelu Stripe!
           Dla bezpieczeństwa zostawiłem na razie tylko 'card'.
           Jeśli włączyłeś BLIK w Stripe, dodaj go z powrotem do tablicy.
        */
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], 
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.URL}/Success`, 
            cancel_url: `${process.env.URL}/Cart`, 
            customer_email: customerInfo.email, // Automatycznie wypełni email w Stripe
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
        console.error('Stripe error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};