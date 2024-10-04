exports.handler = async (event, context) => {
    const placeId = "ChIJHWrUoHjFkIgRRHv8S2M2OoI"; // Your Place ID
    const apiKey = process.env.GOOGLE_API_KEY; // Get your API key from environment variables
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
  
      const headers = {
        'Access-Control-Allow-Origin': 'https://www.apesolar.com', // Allow requests from your domain
        'Access-Control-Allow-Headers': 'Content-Type',
      };
  
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow requests from all origins (or specify your domains)
        },
        body: JSON.stringify({ error: 'Error fetching data' }),
      };
    }
  };
  