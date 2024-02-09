const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectToDatabase = require('./db/db.js');
const routes = require('./db/routes/index');
require("dotenv").config();




const app = express();
const PORT = 3000;

connectToDatabase();

app.use(express.json());

app.use('/user', routes.user);

app.get('/', (req,res,next)=>{
    res.send('server is up on port 3000');
})


app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
