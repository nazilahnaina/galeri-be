const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Memuat variabel lingkungan dari .env
const userRoutes = require('./routes/userRoutes');
const albumRoutes = require('./routes/albumRoutes');
const fotoRoutes = require('./routes/fotoRoutes')

const app = express();
const port = process.env.PORT || 3000;

console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err.message));

app.use(express.json());  // Middleware untuk mem-parsing JSON
app.use('/api/user', userRoutes);

app.use('/api/album' , albumRoutes);

app.use('/api/foto', fotoRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
