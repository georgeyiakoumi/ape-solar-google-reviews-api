const allowedOrigins = [
  'https://www.apesolar.com',
  'https://www.ape.solar',
  'https://ape-solar.webflow.io',
];

const handler = async (event, context) => {
  const origin = event.headers.origin; // Get the origin from the request headers

  const placeId = "ChIJHWrUoHjFkIgRRHv8S2M2OoI"; // Your Place ID
  const apiKey = process.env.GOOGLE_API_KEY; // Your API key

  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error_message }),
      };
    }

    const reviews = data.result.reviews || [];

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0], // Set to the origin if allowed
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviews),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch reviews' }),
    };
  }
};

exports.handler = handler;
