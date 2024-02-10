const {Router} = require('express');
const Day = require('../models/Day');
const router = Router();



const exampleDay = {
    date: '2024-02-07',
    user: '65c697792d46be2d941f64fe',
    events: [
      {
        startTime: '0800',
        endTime: '0900',
        title: 'Brush Teeth',
        recurring: false,
        recursEvery: null
      },
      {
        startTime: '1000',
        endTime: '1100',
        title: 'Use Restroom',
        recurring: false,
        recursEvery: null
      },
      {
        startTime: '1400',
        endTime: '1400',
        title: 'Pee Sitting Down',
        recurring: false,
        recursEvery: null
      }
    ],
    food: [
      {
        startTime: '1200',
        endTime: '1200',
        title: 'Sandwich',
        recurring: false,
        recursEvery: null
      }
    ],
    medication: [
      {
        startTime: '1300',
        endTime: '1400',
        title: 'Remicade',
        recurring: true,
        recursEvery: 28
      }
    ],
    symptoms: [{title: 'nausea'}, {title: 'rectal bleeding'}, {title: 'abdominal pain', startTime: '1600'}],
    reflection: {
        body: 'You know today was a pretty good day. My stress levels were low and even though I bled out of my booty hole, I do not think that is a huge deal',
        stress: 4,
        emotion: 'Happy'
    }
  }

//this is just a place holder to make sure the DB is up and running
//replace when you get to routes
router.get('/', async (req,res)=>{
    try {
        const calendarDay = await Day.create(exampleDay);
        res.send('day created successfully');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//for posting you initial event on a day -- it will set up the model to then be edited in the future
router.post('/', async (req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//for editing the established Day model with new events and removing certain events
//this might be an inefficient way of doing things, as the entire data may need to be replaced every time
//look into the mongoose findOneAndUpdate method -- might be what i'm looking for
router.put('/', async (req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//hypothetically when deleting the last event of the day??
//i don't know how it would make it know.. maybe it would stay and just be blank?
//but if that happened for every day you would need to make fetch requests for essentially nothing.
router.delete('/', async (req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});







module.exports = router;