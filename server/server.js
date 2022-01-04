require("dotenv").config();
const express = require('express');

const app = express();

// middleware 
app.use((req, res, next) => {
  console.log('yeah our middleware');
  next(); // next will send to our next middleware or route.
});

// Get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: ['mcdonalds', 'haldiram'],
    },
  })
});

// Get a restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params);
}); 

// Create a restaurants
app.post('/api/v1/restaurants', (req, res) => {
  console.log(req);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port: ${port}`);
})