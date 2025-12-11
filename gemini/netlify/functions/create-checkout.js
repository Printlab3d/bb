// netlify/functions/create-checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { items, customerInfo, shipping } = JSON.parse(event.body);

        // Tworzenie listy produktów dla Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'pln',
                product_data: {
                    name: item.name,
                    // Używamy zlokalizowanej ścieżki do obrazka:
                    images: [`${process.env.URL}${item.image_url}`], 
                },
                unit_amount: Math.round(item.price * 100), // Cena w groszach
            },
            quantity: item.quantity,
        }));

        // Dodanie kosztu wysyłki
        if (shipping > 0) {
            lineItems.push({
                price_data: {
                    currency: 'pln',
                    product_data: {
                        name: 'Dostawa kurierska',
                    },
                    unit_amount: Math.round(shipping * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'blik', 'p24'], 
            shipping_address_collection: {
                allowed_countries: ['PL'],
            },
            line_items: lineItems,
            mode: 'payment',
            // Redirect URL Netlify jest dostępny przez zmienną ENV
            success_url: `${process.env.URL}/Success`, 
            cancel_url: `${process.env.URL}/Cart`, 
            metadata: {
                customer_name: customerInfo.name,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                delivery_address: customerInfo.address,
                delivery_city: customerInfo.city,
                delivery_postal: customerInfo.postal,
                notes: customerInfo.notes,
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url }),
        };
    } catch (error) {
        console.error('Stripe error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};