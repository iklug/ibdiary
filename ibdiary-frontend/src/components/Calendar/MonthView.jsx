import { useState, useEffect } from "react";
import arrayOfDaysInMonth from "../../utils/arrayOfDaysInMonth";
import findFirstDay from "../../utils/findFirstDay";
import Day from "./Day";
import buildCalendar from "../../utils/buildCalendar";
import DayOfTheWeek from "../DayOfTheWeek";
import dayNames from "../../utils/dayNames";
import { useSelector, useDispatch } from "react-redux";
import { selectNewEvent, openNewEvent } from "../../redux/newEventSlice";
import { addBulk, selectMonths, trackMonth } from "../../redux/calendarSlice";

const MonthView = ({year, month, today}) => {


const backend = import.meta.env.MODE === 'development' ?  `http://localhost:3000` : ''; 

const dispatch = useDispatch();

const [sixRows, setSixRows] = useState(null);
const thisMonthDays = arrayOfDaysInMonth(year, month);
const daysBefore = arrayOfDaysInMonth(year, month - 1);
const nextMonthDays = arrayOfDaysInMonth(year, month + 1);
const firstDay = findFirstDay(year, month);

const trueMonth = thisMonthDays[0].twoDigitMonth;
const monthsInState = useSelector(selectMonths);
console.log(monthsInState);

const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const [windowHeight, setWindowHeight] = useState(window.innerHeight);


// Define a function to update window width in state
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


useEffect(()=>{
   thisMonthDays.length + firstDay > 35 ? setSixRows(true) : setSixRows(false); 
}, [month]);

useEffect(()=> {
   const getAllEvents = async() => {
      try {
        console.log('this is running another fetch request e very time');
          const request = await fetch(`${backend}/event/${year}/${trueMonth}`,{
              method: 'GET',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if(!request.ok){
              throw new Error('request resulted in error @ submitEvent in AddEvent.jsx');
          }
          const data = await request.json();
          console.log('🥶🥶🥶',data[0]);
          const dataObject = {};
         //  const dataReformat = data.map(x => { return {[x.date]: x}});
         data.forEach(x => dataObject[x.date] = x);
         console.log(dataObject);
         //  console.log('🥵🥵🥵',dataReformat)
            dispatch(addBulk(dataObject));
            if(!monthsInState.includes(`${trueMonth}-${year}`)){
                dispatch(trackMonth(`${trueMonth}-${year}`))
            }

      } catch (error) {
          console.error(error);
      }
  }
  if(!monthsInState.includes(`${trueMonth}-${year}`)){
      getAllEvents();
  }
}, [month])




const dayArray = buildCalendar(thisMonthDays, firstDay, daysBefore, nextMonthDays, today);
const dayArrayMap = dayArray.map(x => <Day {...x} key={`${x.year}-${x.month}-${x.day}`} dayId={x._id} />)

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

export default MonthView;