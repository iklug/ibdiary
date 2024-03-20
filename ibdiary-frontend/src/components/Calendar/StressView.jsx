import { useSelector } from "react-redux";
import { selectCalendar } from "../../redux/calendarSlice";
import { useState, useEffect } from "react";
import arrayOfDaysInMonth from "../../utils/arrayOfDaysInMonth";
import findFirstDay from "../../utils/findFirstDay";
import Day from "./Day";
import buildCalendar from "../../utils/buildCalendar";
import DayOfTheWeek from "../DayOfTheWeek";
import dayNames from "../../utils/dayNames";
import { useDispatch } from "react-redux";
import { selectNewEvent, openNewEvent } from "../../redux/newEventSlice";
import { addDay, selectMonths, trackMonth } from "../../redux/calendarSlice";
import { getUser, selectUser } from "../../redux/profileSlice";
import AddEvent from "./AddEvent";
import { selectRepeatEvents } from "../../redux/repeatEventSlice";


const StressView = ({date, today, year, month}) => {
    
 
const dispatch = useDispatch();



const [sixRows, setSixRows] = useState(null);
const thisMonthDays = arrayOfDaysInMonth(year, month);
const daysBefore = arrayOfDaysInMonth(year, month - 1);
const nextMonthDays = arrayOfDaysInMonth(year, month + 1);
const firstDay = findFirstDay(year, month);
const [newEvent, setNewEvent] = useState(false);
const [newEventDate, setNewEventDate] = useState('');

const trueMonth = thisMonthDays[0].twoDigitMonth;
const monthsInState = useSelector(selectMonths);
const currentUser = useSelector(selectUser);

const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const [windowHeight, setWindowHeight] = useState(window.innerHeight);



const updateWindowWidth = () => {
  setWindowWidth(window.innerWidth);
};
const updateWindowHeight = () => {
    setWindowHeight(window.innerHeight);
}

// Add event listener to update window width on resize
useEffect(() => {
  window.addEventListener('resize', updateWindowWidth);
  window.addEventListener('resize', updateWindowHeight);
  
  // Clean up the event listener
  return () => {
    window.removeEventListener('resize', updateWindowWidth);
    window.removeEventListener('resize', updateWindowHeight);
  };
}, []);

const apiURL = import.meta.env.MODE === 'production' ? 'https://ibdiary.fly.dev' : `http://localhost:3000`; 



useEffect(()=>{
   thisMonthDays.length + firstDay > 35 ? setSixRows(true) : setSixRows(false); 
}, [month]);

useEffect(()=> {
   const getEvents = async() => {
      try {
        console.log('this is running another fetch request e very time');
          const request = await fetch(`${apiURL}/event/initial/${year}/${trueMonth}`,{
              method: 'GET',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if(!request.ok){
              throw new Error('request resulted in error @ getEvents in MonthView.jsx');
          }
          const data = await request.json();
          const dataObject = {};
         data.forEach(x => dataObject[x.date] = x);
            dispatch(addDay(dataObject));
            if(!monthsInState.includes(`${trueMonth}-${year}`)){
                dispatch(trackMonth(`${trueMonth}-${year}`))
            }

      } catch (error) {
          console.error(error);
      }
  }
  
  if(!monthsInState.includes(`${trueMonth}-${year}`)){
      getEvents();
  }
  
}, [month])

useEffect(()=>{
    const updateUser = async() => {
        try {
            const request = await fetch(`${apiURL}/user`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!request.ok){
                throw new Error('failed to fetch user @ getUser in MonthView.jsx')
            }
            const data = await request.json();
            console.log(data);
            dispatch(getUser(data));
        } catch (error) {
            console.error(error);
        }
      }

    updateUser();

}, []);

const dayArray = buildCalendar(thisMonthDays, firstDay, daysBefore, nextMonthDays, today);
const dayArrayMap = dayArray.map(x => <StressDay {...x} key={`${x.year}-${x.month}-${x.day}`} />)

// console.log(window.innerHeight, window.innerWidth);

    return (
        <div className={`flex flex-col monthCalSix text-gray-500`}>
            <div className="flex">
                {dayNames.map(x => <DayOfTheWeek day={x} key={x} />)}
            </div>
            <div className="flex flex-1  ">
               {dayArrayMap.slice(0,7)}
            </div>
            <div className="flex flex-1 ">
               {dayArrayMap.slice(7,14)}
            </div>
            <div className="flex flex-1 ">
               {dayArrayMap.slice(14,21)}
            </div>
            <div className=" flex flex-1">
               {dayArrayMap.slice(21,28)}
            </div>
            <div className=" flex flex-1">
               {dayArrayMap.slice(28,35)}
            </div>
            {sixRows && 
            <div className="flex flex-1">
            {dayArrayMap.slice(35,dayArray.length)}
         </div>
            }
        </div>
    )
}
export default StressView;