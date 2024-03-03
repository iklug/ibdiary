const {Router} = require('express');
const User = require('../models/User');
const router = Router();


//this is just a place holder to make sure the DB is up and running
//replace when you get to routes
router.get('/', async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/:type', async(req,res)=>{
    console.log('req.body -- ',req.body);
    try {
        const type = req.params.type;
        const update = {$set: {[type]: req.body}};
        const user = await User.findOneAndUpdate({_id: req.user._id}, update, {new:true, runValidators: true});
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
