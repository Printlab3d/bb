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
    // Pobieramy koszyk i dane klienta z requestu
    const { cart, customer } = JSON.parse(event.body);
    const site_url = process.env.URL || 'https://viberush.pl'; // Podmień na swój adres

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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items,
      mode: 'payment',
      success_url: `${site_url}/success`,
      cancel_url: `${site_url}/Cart`,
      // Przekazujemy email klienta do formularza Stripe
      customer_email: customer ? customer.email : undefined,
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