const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/reviews', async (req, res) => {
  const placeId = 'ChIJHWrUoHjFkIgRRHv8S2M2OoI';  // Your place ID
  const apiKey = '***REMOVED***';  // Your Google API Key
  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`);
    res.json(response.data.result.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Failed to fetch reviews');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
