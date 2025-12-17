import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
    // 1. Zabezpieczenie CORS (żeby przeglądarka nie blokowała)
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // 2. Obsługa OPTIONS (pre-flight request)
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // 3. Sprawdzenie czy jest treść zapytania
        if (!event.body) {
            throw new Error("Brak danych w zapytaniu (Request body is empty)");
        }

        const { items, customerInfo, shipping } = JSON.parse(event.body);

        // 4. Przygotowanie produktów dla Stripe
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

        // 5. Tworzenie sesji
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'blik', 'p24'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.URL}/Success`,
            cancel_url: `${process.env.URL}/Cart`,
            customer_email: customerInfo.email,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: session.url }),
        };

    } catch (error) {
        console.error("Critical Error:", error);
        return {
            statusCode: 500, // Zwracamy 500 zamiast crashować
            headers,
            body: JSON.stringify({ error: error.message || "Unknown Error" }),
        };
    }
};