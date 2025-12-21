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
    // URL twojej strony (pobierany z Netlify lub localhost)
    const site_url = process.env.URL || 'http://localhost:5173';

    const line_items = cart.map((item) => {
      // Budowanie pełnego linku do zdjęcia
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
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items,
      mode: 'payment',
      success_url: `${site_url}/Home`,
      cancel_url: `${site_url}/Cart`,
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