const {Router} = require('express');
const User = require('../models/User');
const router = Router();


//this is just a place holder to make sure the DB is up and running
//replace when you get to routes
router.get('/', async (req,res)=>{
    try {
        const user = await User.create({email: "email@email.com"});
        res.send('user created successfully');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;