exports.handler = async (event, context) => {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const PLACE_ID = 'ChIJHWrUoHjFkIgRRHv8S2M2OoI';

    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${PLACE_ID}&key=${API_KEY}`;

    try {
        const response = await fetch(url); // Fetch should be available in the environment
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const reviews = data.result.reviews || [];

        return {
            statusCode: 200,
            body: JSON.stringify(reviews),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
