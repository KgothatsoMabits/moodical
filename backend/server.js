const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const spotifyRoutes = require('./routes/spotify');

const app = express();
const port = 5000;

dotenv.config();

const spotify_client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;


app.use(cors());
app.use(express.json());

// Spotify API routes
app.use('/api/spotify', spotifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

