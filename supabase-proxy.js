// Simple Express proxy for Supabase
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy all requests to Supabase REST API
app.use('/supabase', async (req, res) => {
  const supabaseUrl = 'https://crbmzqqqokkpircxwwhn.supabase.co'; // Replace with your Supabase project URL
  const apiPath = req.url;
  const targetUrl = supabaseUrl + apiPath;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: supabaseUrl.replace('https://', '')
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).send('Proxy server error');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
