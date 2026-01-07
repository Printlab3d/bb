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
    const { cart } = JSON.parse(event.body);
    const site_url = process.env.URL || 'http://localhost:5173';

    // 1. Tworzymy listę produktów do Stripe
    const line_items = cart.map((item) => {
      const imageUrl = item.image 
        ? `${site_url}${item.image}` 
        : (item.images && item.images[0] ? `${site_url}${item.images[0]}` : '');

      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe używa groszy
        },
        quantity: item.quantity,
      };
    });

    // 2. Obliczamy sumę koszyka (żeby sprawdzić czy darmowa wysyłka)
    const productsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Jeśli suma < 150 zł, dodaj wysyłkę do rachunku
    if (productsTotal < 150) {
      line_items.push({
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Koszty wysyłki (Kurier/Paczkomat)',
          },
          unit_amount: 1500, // 15.00 PLN w groszach
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items,
      mode: 'payment',
      success_url: `${site_url}/success`,
      cancel_url: `${site_url}/Cart`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id }),
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