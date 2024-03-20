const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectToDatabase = require('./db/db.js');
const routes = require('./db/routes/index');
const cors = require('cors');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const User = require('./db/models/User'); 

const generatePassword = require('./lib/passwordUtils.js').generatePassword;



require("dotenv").config();




const app = express();


const PORT = 3000;

const connection = mongoose.connect(process.env.DB_SECRET_KEY);

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests from any origin in a development environment
      if (process.env.NODE_ENV !== 'production' || !origin) {
        return callback(null, true);
      }
  
      // Check if the request's origin is allowed
      const allowedOrigins = ['http://localhost:5173', 'https://ibdiary.vercel.app', 'https://ibdiary-b6emzf7yf-ians-projects-a0566d81.vercel.app/']; // Add your allowed origins
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
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const sessionStore = new MongoDBStore({
  uri: process.env.DB_SECRET_KEY,
  mongooseConnection: connection,
  collection: 'sessions',
});
sessionStore.on('error', (error)=>console.log(error));
app.enable('trust proxy');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    // secure: true,
    // sameSite: 'none',
  },
}));

require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());

//for testing req.session and req.user
app.use((req,res,next)=>{
  console.log('req.session: ', req.session); //should be created by express session
  console.log('req.user: ', req.user); // should be created by passport middleware
  next();
})

app.use('/user', routes.user);
app.use('/event', routes.event);
app.use('/auth', routes.auth);


function errorHandler(error,req,res,next){
  if(error){
    res.json(error);
  }
}

app.use(errorHandler);

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
