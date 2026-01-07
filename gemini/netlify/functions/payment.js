const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { cart, customer, shipping } = JSON.parse(event.body);
    const site_url = process.env.URL || 'http://localhost:5173';

    // 1. Produkty
    const line_items = cart.map((item) => {
      // Budowanie URL obrazka
      const imageUrl = item.image 
        ? (item.image.startsWith('http') ? item.image : `${site_url}${item.image}`)
        : '';

      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // 2. Logika Kosztów Wysyłki
    // Sprawdzamy wartość koszyka
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const SHIPPING_PRICE = 1350; // 13.50 PLN w groszach
    const FREE_SHIPPING_THRESHOLD = 150; // 150 PLN

    if (cartTotal < FREE_SHIPPING_THRESHOLD) {
      line_items.push({
        price_data: {
          currency: 'pln',
          product_data: {
            name: `Dostawa: ${shipping.method.toUpperCase()}`,
            description: customer.paczkomatCode ? `Kod punktu: ${customer.paczkomatCode}` : 'Dostawa standardowa',
          },
          unit_amount: SHIPPING_PRICE,
        },
        quantity: 1,
      });
    }

    // 3. Tworzenie sesji Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items,
      mode: 'payment',
      success_url: `${site_url}/Home`, // Po sukcesie
      cancel_url: `${site_url}/Cart`,  // Po anulowaniu
      customer_email: customer.email,
      metadata: {
        customer_name: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        shipping_method: shipping.method,
        paczkomat_code: customer.paczkomatCode || 'N/A', // Kod paczkomatu w panelu Stripe
        address: `${customer.address}, ${customer.zipCode} ${customer.city}`
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error('Payment Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};