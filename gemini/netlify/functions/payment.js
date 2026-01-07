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
    
    // ZMIANA 1: Upewnij się, że ten adres to TWOJA domena na Netlify (bez ukośnika na końcu)
    // Jeśli environment variable nie zadziała, ten string uratuje sytuację.
    const site_url = process.env.URL || 'https://viberush.netlify.app'; 

    // 1. Produkty
    const line_items = cart.map((item) => {
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
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const SHIPPING_PRICE = 1350; 
    const FREE_SHIPPING_THRESHOLD = 150; 

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
      // ZMIANA 2: Na start tylko karta. Jak zadziała, dopiszemy 'blik', 'p24'
      payment_method_types: ['card', 'blik', 'p24'], 
      line_items,
      mode: 'payment',
      success_url: `${site_url}/Home`,
      cancel_url: `${site_url}/Cart`,
      customer_email: customer.email,
      metadata: {
        customer_name: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        shipping_method: shipping.method,
        paczkomat_code: customer.paczkomatCode || 'N/A',
        address: `${customer.address}, ${customer.zipCode} ${customer.city}`
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    // ZMIANA 3: Lepsze logowanie błędu, żebyś widział przyczynę w konsoli Netlify
    console.error('Payment Error Message:', error.message);
    console.error('Payment Error Type:', error.type);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }), // Zwracamy treść błędu do przeglądarki
    };
  }
};