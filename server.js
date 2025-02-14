const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Memuat variabel lingkungan dari .env
const userRoutes = require('./routes/userRoutes');
const albumRoutes = require('./routes/albumRoutes');
const fotoRoutes = require('./routes/fotoRoutes');
const komentarRoutes = require('./routes/komentarRoutes');  
const likeRoutes = require('./routes/likeRoutes');
const cors = require('cors');  

const app = express();
const port =5001;

app.use(cors());

console.log('Attempting to connect to MongoDB...');
mongoose.connect("mongodb+srv://nazilahnaina:naina1234@galeri-be.nnxm0.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Connection error:', err);
    console.error('Error cause:', err.cause);
  });
app.use(express.json());  // Middleware untuk mem-parsing JSON
app.use('/api/user', userRoutes);

app.use('/api/album' , albumRoutes);

app.use('/api/foto', fotoRoutes);

app.use('/api/komentar', komentarRoutes); 

app.use('/api/like', likeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
