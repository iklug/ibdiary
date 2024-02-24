const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectToDatabase = require('./db/db.js');
const routes = require('./db/routes/index');
const cors = require('cors');

require("dotenv").config();




const app = express();
const PORT = 3000;

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests from any origin in a development environment
      if (process.env.NODE_ENV !== 'production' || !origin) {
        return callback(null, true);
      }
  
      // Check if the request's origin is allowed
      const allowedOrigins = ['http://localhost:5173']; // Add your allowed origins
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

connectToDatabase();

app.use(express.json());

app.use('/user', routes.user);
app.use('/event', routes.event);

app.get('/', (req,res,next)=>{
    res.send('server is up on port 3000');
})


app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
