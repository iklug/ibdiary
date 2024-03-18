const {Router} = require('express');
const Day = require('../models/Day');
const Event = require('../models/Event');
const router = Router();
const monthAndYearBefore = require('../../utils/monthsBeforeAndAfter').monthAndYearBefore;
const monthAndYearAfter = require('../../utils/monthsBeforeAndAfter').monthAndYearAfter;
const mongoose = require('mongoose');
const {checkAuth, checkNoAuth} = require('../../lib/authMiddleware');
const printDates = require('../../utils/generateDates');
const RepeatingEvent = require('../models/RepeatingEvent');




router.get('/:year/:month',checkAuth, async (req,res)=>{
    const year = req.params.year;
    const month = req.params.month;
    const regexSearch = new RegExp(`^${year}-${month}-`);
    console.log('is this being requested');
    try {
        const monthOfEvents = await Day.find({date: {$regex: regexSearch}, user: req.user._id});
        //this could be 30 events .. and then the way i have it set up you'd have to do 30 searches to find groups of events
        res.send(monthOfEvents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/initial/:year/:month', checkAuth, async (req,res)=>{
  console.log('running initial calendar get @ event.js');

  const year = req.params.year;
  const month = req.params.month;
  
  const regexSearch = new RegExp(`^${year}-${month}-`);
  const before = new RegExp(monthAndYearBefore(year, month));
  const after = new RegExp(monthAndYearAfter(year, month));
  console.log(before, after);
  try {
      const previousMonth = await Day.find({date: {$regex: before}, user: req.user._id }).populate('repeatingEvents');
      const currentMonth = await Day.find({date: {$regex: regexSearch}, user: req.user._id}).populate('repeatingEvents');
      const nextMonth = await Day.find({date: {$regex: after}, user: req.user._id}).populate('repeatingEvents');
      //this could be 30 events .. and then the way i have it set up you'd have to do 30 searches to find groups of events
      const allEvents = [...previousMonth, ...currentMonth, ...nextMonth];

      res.send(allEvents);
    } catch (error) {
      res.status(500).json({message: error.message});
  }
});

router.get('/next/:year/:month', async (req,res)=>{
  console.log('running initial calendar get @ event.js');

  const year = req.params.year;
  const month = req.params.month;

  const after = new RegExp(monthAndYearAfter(year, month));
  console.log(before, after);
  try {
      
      const nextMonth = await Day.find({date: {$regex: after}});
      //this could be 30 events .. and then the way i have it set up you'd have to do 30 searches to find groups of events

      res.send(nextMonth);
    } catch (error) {
      res.status(500).json({message: error.message});
  }
});

router.post('/', checkAuth, async (req,res)=> {
    try {
        // const day = await Day.find({date: req.body.date, user: req.user._id});

        // if(day.length > 0){
        //   const update = {$push: { events:{
        //     title: req.body.title,
        //     type: req.body.type,
        //     startTime: req.body.startTime,
        //     endTime: req.body.endTime,
        //     repeat: req.body.repeat,}
        //   }}
        //   const event = await Day.findOneAndUpdate({_id:day[0]._id}, update, {new:true, runValidators: true});
        
        //   res.send(event);
        // }
        // if(day.length === 0){
        //   const newDay = await Day.create({
        //     date: req.body.date,
        //     user: req.user._id,
        //     events: [
        //       {
        //         title: req.body.title,
        //         type: req.body.type,
        //         startTime: req.body.startTime,
        //         endTime: req.body.endTime,
        //         repeat: req.body.repeat,
        //       }
        //     ],
        //   });
         

        //   res.send(newDay);
        // }
        const update = {
          title: req.body.title,
          type: req.body.type,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          repeat: req.body.repeat,
        }
        const day = await Day.findOneAndUpdate({date: req.body.date, user: req.user._id}, {$push:{events: update}}, {new:true, runValidators:true}).populate('repeatingEvents');
        if(day){
          res.json(day);
        } else {
          const newDay = await Day.create({date: req.body.date, user: req.user._id, events: [update]});
          res.json(newDay);
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:eventId', async (req,res)=> {
    try {
      const eventId = req.params.eventId;
      const convertTypeId = new mongoose.Types.ObjectId(eventId);
      const updatedEvent = {
        title: req.body.title,
        type: req.body.type,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        repeat: req.body.repeat,
        _id: req.body._id,
        date: req.body.newDate
  };

  const initialDay = await Day.findOneAndUpdate({date: req.body.originalDate, user: req.user._id}, {$pull: {events: {_id: convertTypeId}}}, {new:true, runValidators: true});
      if(req.body.originalDate !== req.body.newDate){
        const newDay = await Day.find({date: req.body.newDate, user: req.user._id});
        if(newDay.length === 0){
          const makeDay = await Day.create({date: req.body.newDate, user: req.user._id, events: [updatedEvent]});
          console.log('makeDay', makeDay);
          res.json(makeDay);
        } else {
          const updatedDay = await Day.findOneAndUpdate({date: updatedEvent.date, user: req.user._id}, {$push: {events: updatedEvent}}, {new:true, runValidators: true});
          res.json(updatedDay);
        }

        } else {
        const day = await Day.findOneAndUpdate({date: updatedEvent.date, user: req.user._id}, {$push: {events: updatedEvent}}, {new:true, runValidators: true});
        res.json(day);
      }
      // const day = await Day.find({date: req.body.originalDate});
      
      //   const events = day[0].events.filter(event => !event._id.equals(convertTypeId));
      //   const updatedDay = await Day.findOneAndUpdate({date: updatedEvent.date}, {$push: {events: [...events, updatedEvent]}}, {new:true, runValidators: true});
      //   res.json(updatedDay);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.post('/repeating', checkAuth, async(req,res)=>{
  try {
    console.log('req.body for repeat', req.body);
    const futureDates = printDates(req.body.repeat, req.body.date);

    const repeatingEvent = {
      title: req.body.title,
      user: req.user._id,
      type: req.body.type,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      repeat: req.body.repeat,
      dates: futureDates,
    };
    console.log(repeatingEvent);

    const  newRepeatEvent = await RepeatingEvent.create({...repeatingEvent});

    const allUpdatedDays = [];

    for(const date of futureDates){
      // const newDay = await Day.findOne({date: date, user: req.user._id});
      // if(newDay){
      //   console.log('newDay', newDay._id);
      //   console.log('event', newRepeatEvent._id);
      
      const updateDay = await Day.findOneAndUpdate({date:date, user:req.user._id}, {$push: {repeatingEvents: newRepeatEvent._id}}, {new:true, runValidators: true}).populate('repeatingEvents');
      
      if(updateDay){
        console.log('updateDay after populate', updateDay);
        allUpdatedDays.push(updateDay);
      }
      if(!updateDay){
      const createDay = await Day.create({date: date, user: req.user._id, repeatingEvents: [newRepeatEvent._id]});
      const populateCreateDay = await createDay.populate('repeatingEvents');
      allUpdatedDays.push(populateCreateDay);
    }
    }
    res.json(allUpdatedDays);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
})

router.put('/:eventId/all', async(req,res)=>{
  console.log('is this the one that is running?/?')
  try { 
    const update = {
      title: req.body.title,
      type: req.body.type,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      repeat: req.body.newRepeat,
    };
  if(req.body.originalDate === req.body.newDate && req.body.repeat === req.body.newRepeat){
    const event = await RepeatingEvent.findByIdAndUpdate(req.params.eventId, update, {new:true, runValidators:true});
    res.json(event);
  } else {
    const dates = printDates(req.body.newRepeat, req.body.newDate);
    const diffUpdate = {
      title: req.body.title,
      type: req.body.type,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      repeat: req.body.newRepeat,
      dates: dates,
      user: req.user._id,
    };
    const deleteOriginal = await RepeatingEvent.findByIdAndDelete(req.params.eventId);
    const  newRepeatEvent = await RepeatingEvent.create({...diffUpdate});

    const allUpdatedDays = [];

    for(const date of dates){
      // const newDay = await Day.findOne({date: date, user: req.user._id});
      // if(newDay){
      //   console.log('newDay', newDay._id);
      //   console.log('event', newRepeatEvent._id);
      
      const updateDay = await Day.findOneAndUpdate({date:date, user:req.user._id}, {$push: {repeatingEvents: newRepeatEvent._id}}, {new:true, runValidators: true}).populate('repeatingEvents');
      
      if(updateDay){
        console.log('updateDay after populate', updateDay);
        allUpdatedDays.push(updateDay);
      }
      if(!updateDay){
      const createDay = await Day.create({date: date, user: req.user._id, repeatingEvents: [newRepeatEvent._id]});
      const populateCreateDay = await createDay.populate('repeatingEvents');
      allUpdatedDays.push(populateCreateDay);
    }
    }
    console.log('allUpdatedDays',allUpdatedDays);
    res.json(allUpdatedDays);
  }
  } catch (error) {
  console.log(error);
  res.status(500).json({message: error.message})
  }}
);

router.put('/:eventId/single', checkAuth, async(req,res)=>{

  try { 
    console.log('what is going on here >>>>>>>>>',req.body);
  
    // const dates = printDates(update.newRepeat, update.newDate);
    const diffUpdate = {
      title: req.body.title,
      type: req.body.type,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      repeat: 0,
      date: req.body.newDate,
    };
    const objectId = new mongoose.Types.ObjectId(req.params.eventId);
    const dayArray = [];

    if(req.body.originalDate !== req.body.newDate){
      const previousDay = await Day.findOneAndUpdate({date: req.body.originalDate, user: req.user._id}, {
        $pull: {
          repeatingEvents: objectId,
        }
      });
      dayArray.push(previousDay);
    }
    
    const day = await Day.findOneAndUpdate({date: req.body.newDate, user: req.user._id}, {
      $push: {
        events: diffUpdate,
      },
      $pull: {
        repeatingEvents: objectId,
      }
    }, {new:true, runValidators: true});
    if(day){
      dayArray.push(day);
    } else {
      const newDay = await Day.create({date: req.body.newDate, user: req.user._id, events: [diffUpdate]});
      dayArray.push(newDay);
    }
console.log('1', dayArray);
    res.json(dayArray);
  } catch (error) {
  console.log(error);
  res.status(500).json({message: error.message})
  }
})



router.post('/reflection', checkAuth, async(req,res)=>{
 try {

   const update = {
     body: req.body.body,
     stress: req.body.stress,
     emotion: req.body.emotions,
     edited: true,
   };
   console.log('information sent from user',update);
   const dayExists = await Day.findOne({date: req.body.date, user: req.user._id});
   console.log('in reflection post', dayExists);
   if(dayExists){
     const updatedDay = await Day.findOneAndUpdate({_id: dayExists._id}, {$set:{ reflection: update}}, {new:true, runValidators: true}).populate('repeatingEvents');
     console.log('this is supposed to be the updated Day: ',updatedDay);
     res.json(updatedDay);
   } else {
    console.log('this isnt happening though')
   const createDay = await Day.create({
    date: req.body.date,
    user: req.user._id,
    events: [],
    reflection: {
      ...update
    }});
   res.json(createDay);
  }
 } catch (error) {
  console.error(error);
  res.json({message: error});
 }
 

})


//hypothetically when deleting the last event of the day??
//i don't know how it would make it know.. maybe it would stay and just be blank?
//but if that happened for every day you would need to make fetch requests for essentially nothing.
router.delete('/:event', checkAuth, async (req,res)=> {
    try {
      // const dayId = req.params.day;
      const eventId = req.params.event;
      const date = req.body.date;
      const day = await Day.findOne({date: date, user: req.user._id});
      const filtered = day.events.filter(x => x.id !== eventId );

      const update = {
          events: filtered
      };
        
        const updateDay = await Day.findByIdAndUpdate(day._id, update,{new:true, runValidators: true}).populate('repeatingEvents');
        res.json(updateDay);
  
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// router.delete('/repeat/single', checkAuth, async (req,res)=>{
//   try {
//     //find the objectId associated with this particular repeat event
//     //remove that object id from the repeatingEvents array
//     //do i have it added in the event, i do, but does it even matter?
//     const date = req.body.date;
//     const eventId = req.params._id;
//     const convertTypeId = new mongoose.Types.ObjectId(`${eventId}`);
//     const filterEvent = (eventId, array) => {
//       return array.filter(item => item !== eventId);
//     }

//     const query = await Day.findOne({date: date, user: req.user._id});
//     const newRepeatingEvents = query.repeatingEvents.filter(item => item._id !== convertTypeId);
//     const update = await Day.findByIdAndUpdate(query._id, {repeatingEvents: newRepeatingEvents}, {new:true, runValidators: true});
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// });

router.delete('/repeat/all', checkAuth, async(req,res)=> {
  try {
    // const convertTypeId = new mongoose.Types.ObjectId(`${req.body._id}`);

    const repeatingEvent = await RepeatingEvent.findOneAndDelete({_id: req.body._id});
    const information = repeatingEvent.dates;
    console.log('information', information)
    res.json(information);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.delete('/repeat/single', checkAuth, async(req,res)=> {
  
  try {
    // const query = await Day.findOne({date: req.body.date, user: req.user._id});
    // const update = query.repeatingEvents.filter(item => item.toString() !== req.body._id);
    // const updatedQuery = await Day.findOneAndUpdate({date: req.body.date, user: req.user._id}, {repeatingEvents: update}, {new: true, runValidators: true});
    const updatedQuery = await Day.findOneAndUpdate({date: req.body.date, user: req.user._id}, {$pull: {repeatingEvents: req.body._id}}, {new: true, runValidators: true});
    res.json(updatedQuery);
  } catch (error) {
    res.status(401).json({message: error.message});
  }
});

// router.put('repeat/all', checkAuth, async(req,res)=>{
// try {
//   const update = 
// } catch (error) {
//   res.status(500).json({message: error.message});
// }
// });




module.exports = router;