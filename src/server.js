const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Define an API route to fetch data from the external API
app.get('/api/quotes', async (req, res) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
      headers: {
        'X-Api-Key': 'y5MJThH96B02OHR2ynL7PA == uSqAaXtmVNQSKsp9',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve your React application (assuming it's built and located in the "build" folder)
app.use(express.static('build'));

// Handle other routes here if needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
