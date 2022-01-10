require("dotenv").config();
const cors = require("cors")
const db = require('./db')
const express = require('express');
const morgan = require('morgan');
const app = express();

// middleware
app.use(morgan('dev'));

// Two different domains (backend and forntend) bydefault can't talk to each other, we need cors middleware to make that possible.
app.use(cors());

// middleware for post request to retrieve data request from frontend (attach it under the property called body)
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('yeah our middleware');
//   next(); // next will send to our next middleware or route.
// });


// !----Get all Restaurants----!
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    })
  } catch (err) {
    console.log(err);
  }
});


// !----Get Restaurant----!
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await db.query(
      "select * from restaurants where id = $1", [req.params.id]
    );
    // `select * from restaurants where id = ${req.params.id}`
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err);
  }
}); 


// !----Create Restaurant----!
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});


// !----Update Restaurant----!
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch(err) {
    console.log(err);
  }
});


// !----Delete Restaurant----!
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM restaurants where id = $1", [req.params.id]
    )
    res.status(204).json({
      status: 'success',
    })
  } catch(err) {
    console.log(err);
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port: ${port}`);
})
