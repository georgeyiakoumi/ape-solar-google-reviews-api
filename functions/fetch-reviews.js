const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const placeId = 'ChIJHWrUoHjFkIgRRHv8S2M2OoI'; // Replace this with your actual Place ID
    const apiKey = process.env.GOOGLE_API_KEY; // This accesses your API key from environment variables
    
    // Build the URL for the Google Reviews API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'Error fetching data from Google API' }),
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data.result.reviews), // Return only the reviews
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server Error', error: error.message }),
        };
    }
};
