import { useSelector } from "react-redux";
import { selectToday } from "../../redux/dateSlice";
import Hour from "./Hour";
import { selectAmountOfEvents, selectCalendar, selectDay } from "../../redux/calendarSlice";
import Event from './Event';
import { useLayoutEffect, useRef, useEffect, useState, React } from "react";
import arrangeByStartTime from "../../utils/arrangeByStartTime";
import ViewAllEvents from "./ViewAllEvents";


const Day = ({day, month, year, hours, twoDigitDay, twoDigitMonth, dayId}) => {    

    const date = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const events = useSelector(selectCalendar);
    const todaysEvents = events[date] ? events[date] : null;
    const todayString = useSelector(selectToday).string;
    const blueCircle = `${year}-${month}-${day}` === todayString ? 'border-2 border-blue-300 pl-2 pr-2 rounded-full' : '';
    const today = new Date(year, month, day);
    const thisMonth = today.toLocaleString('default', {month: 'short'});

    const sortedEvents = todaysEvents ? arrangeByStartTime(todaysEvents) : null;
    // if(todaysEvents){
    //   sortedEvents = arrangeByStartTime(todaysEvents);
    // }
    const [viewAllEvents, setViewAllEvents] = useState(false);
    const [hiddenNumber, setHiddenNumber] = useState(0);
    
    if(window.innerHeight > 900 && hiddenNumber !== 7){
      setHiddenNumber(7);
    }
    if(window.innerHeight > 800 && window.innerHeight < 900 && hiddenNumber !== 6){
      setHiddenNumber(6);
    }
    if(window.innerHeight > 700 && window.innerHeight <= 800 && hiddenNumber !== 5){
      setHiddenNumber(5);
    }
    if(window.innerHeight > 600 && window.innerHeight <= 700 && hiddenNumber !== 4){
      setHiddenNumber(4);
    }
    if(window.innerHeight <= 600 && window.innerHeight > 500 && hiddenNumber !== 3){
      setHiddenNumber(3);
    }
    if(window.innerHeight <= 500 && window.innerHeight > 450 && hiddenNumber !== 2){
      setHiddenNumber(2);
    }
    if(window.innerHeight <= 450 && window.innerHeight > 350 && hiddenNumber !== 1){
      setHiddenNumber(1);
    }
    if(window.innerHeight <= 350 && hiddenNumber !== 0){
      setHiddenNumber(0);
    }
    console.log('hiddenNumber', hiddenNumber);

    return (
       <div className="border h-full w-full flex flex-col items-center pt-2 text-sm font-semibold select-none min-w-0 text-clip" id={`${year}-${twoDigitMonth}-${twoDigitDay}`} onClick={(e)=>console.log(e.target.id)}>
           <div className={`${blueCircle} hover:text-blue-400 text-center h-6 min-w-0`} id='open id in single view'>{ day === 1 ? `${thisMonth} ${day}` : `${day}` }</div>

      {/* all the events need keys which will be event ids but i don't have them at the moment */}

               {todaysEvents && <div className=" max-h-32 min-w-0 w-full relative">
                   <div className="flex-col items-start w-full">
                      {
                      (sortedEvents && hiddenNumber > 0) &&
                        sortedEvents.slice(0, hiddenNumber).map(x => <Event {...x} dayId={todaysEvents._id} date={date} key={x._id}/>)
                      }

                    {/* <div className=" font-bold text-xs pl-2 truncate">{(todaysEvents && parentNode.current && window.innerHeight > 350 && (todaysEvents.events.length !== parentNode.current.children.length - 1)) 
                    && (todaysEvents.events.length - parentNode.current.children.length + 1) + ' more'}</div>    */}
                    {(todaysEvents.events.length > hiddenNumber && window.innerHeight > 325) && <div className="font-bold text-xs pl-2 truncate relative" onClick={()=>setViewAllEvents(!viewAllEvents)}>{todaysEvents.events.length - hiddenNumber} more
                      
                    </div>}      
                    {viewAllEvents && <ViewAllEvents events={todaysEvents.events} dayId={todaysEvents._id} date={date} close={()=>setViewAllEvents(!viewAllEvents)} thisMonth={thisMonth} day={day} />}
                    </div>
                   
               </div>}
       </div>
            
            )
}

export default Day;
