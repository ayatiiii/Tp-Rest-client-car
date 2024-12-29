const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Your other server configurations...
app.get('/api/client', (req, res) => {
  res.json({ clients: [] });
});

app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888');
});
