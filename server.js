const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware and routes can be defined here if needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
