const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');




const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req,res,next)=>{
    res.send('server is up on port 3000');
})
app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
