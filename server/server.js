import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
const app = express();

const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: '*',
  })
);

const apiKey = 'y5MJThH96B02OHR2ynL7PA==uSqAaXtmVNQSKsp9';

// Define an API route to fetch data from the external API
app.get('/api/quotes', async (req, res) => {
  try {
    const number = req.query.limit || 5; // If i had premium api key this would be needed
    const apiURL = `https://zenquotes.io/api/random`;
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const jsonData = await response.json();
    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/quotes', async (req, res) => {
  console.log(`req query for POST is:${req.query}`);
  console.log('successfully fetched POST');
  try {
    // If i had premium api key this would be needed
    const number = req.query.limit || 5;
    const category = req.query.category || '';

    const apiURL = `https://zenquotes.io/api/random`;
    const response = await fetch(apiURL, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const jsonData = await response.json();
    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve your React application (assuming it's built and located in the "build" folder)
app.use(express.static('../client'));

// Handle other routes here if needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
