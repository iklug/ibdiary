const {Router} = require('express');
const Day = require('../models/Day');
const Event = require('../models/Event');
const router = Router();



// const exampleDay = {
//     date: '2024-02-07',
//     user: '65c697792d46be2d941f64fe',
//     events: [
//       {
//         startTime: '0800',
//         endTime: '0900',
//         title: 'Brush Teeth',
//         recurring: false,
//         recursEvery: null
//       },
//       {
//         startTime: '1000',
//         endTime: '1100',
//         title: 'Use Restroom',
//         recurring: false,
//         recursEvery: null
//       },
//       {
//         startTime: '1400',
//         endTime: '1400',
//         title: 'Pee Sitting Down',
//         recurring: false,
//         recursEvery: null
//       }
//     ],
//     food: [
//       {
//         startTime: '1200',
//         endTime: '1200',
//         title: 'Sandwich',
//         recurring: false,
//         recursEvery: null
//       }
//     ],
//     medication: [
//       {
//         startTime: '1300',
//         endTime: '1400',
//         title: 'Remicade',
//         recurring: true,
//         recursEvery: 28
//       }
//     ],
//     symptoms: [{title: 'nausea'}, {title: 'rectal bleeding'}, {title: 'abdominal pain', startTime: '1600'}],
//     reflection: {
//         body: 'You know today was a pretty good day. My stress levels were low and even though I bled out of my booty hole, I do not think that is a huge deal',
//         stress: 4,
//         emotion: 'Happy'
//     }
//   }

//this is just a place holder to make sure the DB is up and running
//replace when you get to routes
router.get('/:year/:month', async (req,res)=>{
    const year = req.params.year;
    const month = req.params.month;
    const regexSearch = new RegExp(`^${year}-${month}-`);
    console.log('is this being requested');
    try {
        const monthOfEvents = await Day.find({date: {$regex: regexSearch}});
        //this could be 30 events .. and then the way i have it set up you'd have to do 30 searches to find groups of events
        res.send(monthOfEvents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('initial/:year/:month', async (req,res)=>{
  const year = req.params.year;
  const month = req.params.month;
  const nextMonth = month === '12' ? '01' : month+1;
  const previousMonth = month === '01' ? '12' : month-1;
  const regexSearch = new RegExp(`^${year}-${month}-`);
  console.log('is this being requested');
  try {
      const monthOfEvents = await Day.find({date: {$regex: regexSearch}});
      //this could be 30 events .. and then the way i have it set up you'd have to do 30 searches to find groups of events
      res.send(monthOfEvents);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

router.post('/', async (req,res)=> {
    try {
        const day = await Day.find({date: req.body.date});

        if(day.length > 0){
          const update = {$push: { events:{
            title: req.body.title,
            type: req.body.type,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            repeat: req.body.repeat,}
          }}
          const event = await Day.findOneAndUpdate({_id:day[0]._id}, update, {new:true, runValidators: true});
        
          res.send(event);
        }
        if(day.length === 0){
          const newDay = await Day.create({
            date: req.body.date,
            user: 'user',
            events: [
              {
                title: req.body.title,
                type: req.body.type,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                repeat: req.body.repeat,
              }
            ],
          });
         

          res.send(newDay);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// router.post('/', async (req,res)=> {
//     try {
//         const day = await Day.find({date: req.body.date});

//         if(day.length > 0){
//           const event = await Event.create({
//             day: day[0]._id,
//             title: req.body.title,
//             type: req.body.type,
//             startTime: req.body.startTime,
//             endTime: req.body.endTime,
//             repeat: req.body.repeat,
//           });

//           res.send(event);
//         }
//         if(day.length === 0){
//           const newDay = await Day.create({
//             date: req.body.date,
//             user: 'user',
//           });
//           console.log(newDay);
//           const newEvent = await Event.create(
//             {
//               day: newDay._id,
//             title: req.body.title,
//             type: req.body.type,
//             endTime: req.body.endTime,
//             startTime: req.body.startTime,
//             repeat: req.body.repeat,
//           }
//           )

//           res.send(newEvent);
//         }
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

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
router.delete('/:day/:event', async (req,res)=> {
    try {
      const dayId = req.params.day;
      const eventId = req.params.event;
      const day = await Day.findById(dayId);
      const filtered = day.events.filter(x => x.id !== eventId );
      if(filtered.length === 0){
        const deleteDay = await Day.findByIdAndDelete(dayId);
        res.json(deleteDay.date);
      } else {
        const update = {
          events: filtered
        };
        
        const updateDay = await Day.findByIdAndUpdate(dayId, update,{new:true, runValidators: true});
        res.json(updateDay);
      }
      
      

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});







module.exports = router;