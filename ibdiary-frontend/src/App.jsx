import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import Banner from './components/Banner/Banner';
import Day from './components/Calendar/Day';
import MonthView from './components/Calendar/MonthView';
import { useDispatch, useSelector } from 'react-redux';
import {addToday, selectToday, addViewing, selectView} from './redux/dateSlice';
import WeekView from './components/Calendar/WeekView';
import { selectNewEvent, openNewEvent } from "./redux/newEventSlice";
import AddEvent from './components/Calendar/AddEvent';
import { selectCalendar } from './redux/calendarSlice';
import Login from './pages/Login';

function App() {

const dispatch = useDispatch();


if(!useSelector(selectToday)){

  const today = new Date();
  const todayObject = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    string: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  };
  const viewObject = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    week: 0,
  }
  
  dispatch(addToday(todayObject));
  dispatch(addViewing(viewObject));
}


const today = useSelector(selectToday);
const view = useSelector(selectView);
const newEvent = useSelector(selectNewEvent).open;
const calendar = useSelector(selectCalendar);
console.log('🥳🥳🥳🥳',calendar);

  return (

    // <Button size='small' color={color} name='submit' handleClick={handleClick} />
    <div>
      {/* <Banner />
      <MonthView year={view.year} month={view.month} today={today.day} />
       */}
      {/* <WeekView year={view.year} month={view.month} today={today}/> */}
       <Login />
    </div>
  ) 
}

export default App;
