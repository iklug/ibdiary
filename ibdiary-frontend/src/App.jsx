import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import Banner from './components/Banner/Banner';
import Day from './components/Calendar/Day';
import MonthView from './components/Calendar/MonthView';
import { useDispatch, useSelector } from 'react-redux';
import {addToday, selectToday, addViewing, selectView} from './redux/dateSlice';


function App() {

const dispatch = useDispatch();


if(!useSelector(selectToday)){

  const today = new Date();
  const todayObject = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };
  
  dispatch(addToday(todayObject));
  dispatch(addViewing(todayObject));
}



const view = useSelector(selectView);

  return (

    // <Button size='small' color={color} name='submit' handleClick={handleClick} />
    <div>
      <Banner />
      <MonthView year={view.year} month={view.month} />
    </div>
  ) 
}

export default App
