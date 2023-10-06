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
  console.log(req.query);
  console.log('successfully fetched GET');
  try {
    const number = req.query.limit || 5; // Default to 5 if not provided in the query
    const apiURL = `https://api.api-ninjas.com/v1/quotes?limit=${number}`;
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
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
app.post('/api/quotes', async (req, res) => {
  console.log('successfully fetched POST');
  try {
    const number = req.query.limit || 5; // Default to 5 if not provided in the query
    const category = req.query.category || ''; // Default to empty string if not provided in the query
    const apiURL = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=${number}`;
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
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