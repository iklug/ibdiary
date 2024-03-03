const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const { generatePassword } = require('../../lib/passwordUtils');
const User = require('../models/User');
const passport = require('passport');
const {checkAuth, checkNoAuth} = require('../../lib/authMiddleware');


router.post('/login', checkNoAuth, passport.authenticate('local'), async(req,res,next)=>{
    
    const user = await User.findById(req.user._id);
    const userInfo = {
        id: user._id,
        medical: user.medical,
        personal: user.personal,
        email: user.email,
        preferences: user.preferences,
    }

    res.json(userInfo);
});


router.post('/signup', async(req,res, next)=>{
    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    try {
        const user = await User.create({
            email: req.body.email,
            hash: hash,
            salt: salt,
        })
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('failed to create new user');
    }
});

router.get('/logout',checkAuth, (req,res,next)=>{
    try {
        req.logout((error)=>{
            if(error){
                next(error);
            }
        });
        res.json('logged out');
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});


module.exports = router;