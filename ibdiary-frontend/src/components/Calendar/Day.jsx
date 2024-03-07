import { useSelector } from "react-redux";
import { selectToday } from "../../redux/dateSlice";
import Hour from "./Hour";
import { selectAmountOfEvents, selectCalendar, selectDay } from "../../redux/calendarSlice";
import Event from './Event';
import { useLayoutEffect, useRef, useEffect, useState, React } from "react";
import arrangeByStartTime from "../../utils/arrangeByStartTime";
import ViewAllEvents from "./ViewAllEvents";
import AddEvent from "./AddEvent";
import StressCorner from "./StressCorner";
import ReflectionDots from "./ReflectionDots";
import AddReflection from "./AddReflection";
import { selectRepeatEvents } from "../../redux/repeatEventSlice";


const Day = ({day, month, year, hours, twoDigitDay, twoDigitMonth, addNewEvent, newEventView, newEventDate}) => {    

    const date = `${year}-${twoDigitMonth}-${twoDigitDay}`;
    const events = useSelector(selectCalendar);

    const todaysEvents = events[date] ? events[date] : null;
    const todayString = useSelector(selectToday).string;
    const blueCircle = `${year}-${month}-${day}` === todayString ? 'border-2 border-blue-300 pl-2 pr-2 rounded-full' : '';
    const today = new Date(year, month, day);
    const thisMonth = today.toLocaleString('default', {month: 'short'});
    const [viewReflection, setViewReflection] = useState(false);
    const repeatedEvents = useSelector(selectRepeatEvents);
    const todaysRepeatedEvents = repeatedEvents[date] ? repeatedEvents[date] : null;
   
   
   

    // const sortedEvents = todaysEvents ? arrangeByStartTime(todaysEvents) : null;
    if(todaysEvents){
      console.log(todaysEvents.events);
    }
    const sortedEvents = (todaysEvents) ? arrangeByStartTime(todaysEvents) : false;

    console.log('sortedEVents', sortedEvents);
    // if(todaysEvents){
    //   sortedEvents = arrangeByStartTime(todaysEvents);
    // }
    const [viewAllEvents, setViewAllEvents] = useState(false);
    const [hiddenNumber, setHiddenNumber] = useState(0);
    
    if(window.innerHeight > 900 && hiddenNumber !== 4){
      setHiddenNumber(4);
    }
    if(window.innerHeight > 800 && window.innerHeight < 900 && hiddenNumber !== 3){
      setHiddenNumber(3);
    }
    if(window.innerHeight > 700 && window.innerHeight <= 800 && hiddenNumber !== 2){
      setHiddenNumber(2);
    }
    if(window.innerHeight > 600 && window.innerHeight <= 700 && hiddenNumber !== 1){
      setHiddenNumber(1);
    }
    if(window.innerHeight <= 600 && window.innerHeight > 500 && hiddenNumber !== 1){
      setHiddenNumber(1);
    }
    if(window.innerHeight <= 500 && window.innerHeight > 475 && hiddenNumber !== 1){
      setHiddenNumber(1);
    }
    if(window.innerHeight <= 475 && window.innerHeight > 350 && hiddenNumber !== 0){
      setHiddenNumber(0);
    }
    if(window.innerHeight <= 350 && hiddenNumber !== 0){
      setHiddenNumber(0);
    }

    console.log(hiddenNumber);

    return (
       <div className="border h-full w-full flex flex-col flex-1 items-center pt-2 text-sm font-semibold select-none min-w-0 text-clip">
         <div className="h-full w-full flex flex-col flex-1 items-center text-sm font-semibold select-none min-w-0 text-clip" id={`${year}-${twoDigitMonth}-${twoDigitDay}`} onClick={(e)=>addNewEvent(e.target.id)}>
             <div className={`${blueCircle} hover:text-blue-400 text-center h-6 min-w-0 relative`} id='open id in single view'>{ day === 1 ? `${thisMonth} ${day}` : `${day}` }</div>
             {viewReflection && <AddEvent defaultDate={date} reflection={true} closeReflection={()=>setViewReflection(false)}/>}
             {(newEventView && newEventDate === date) && <AddEvent  closeEvent={()=>addNewEvent('')} defaultDate={date} hasReflection={todaysEvents ? todaysEvents.reflection.edited ? true : false : false}/>}
                 {sortedEvents && <div className=" max-h-32 min-w-0 w-full relative">
                     <div className="flex-col items-start justify-start w-full">
         
         
                        {
                        (sortedEvents && hiddenNumber > 0) &&
                          sortedEvents.slice(0, hiddenNumber).map((x) => <Event {...x} date={date} key={x._id} />)
                        }
                      {/* <div className=" font-bold text-xs pl-2 truncate">{(todaysEvents && parentNode.current && window.innerHeight > 350 && (todaysEvents.events.length !== parentNode.current.children.length - 1))
                      && (todaysEvents.events.length - parentNode.current.children.length + 1) + ' more'}</div>    */}
                      {(sortedEvents && sortedEvents.length > hiddenNumber && window.innerHeight > 350) && <div className="font-bold text-xs pl-2 truncate relative" onClick={()=>setViewAllEvents(!viewAllEvents)}>{sortedEvents.length - hiddenNumber} more
         
                      </div>}
                      {viewAllEvents && <ViewAllEvents events={todaysEvents.events} date={date} close={()=>setViewAllEvents(!viewAllEvents)} thisMonth={thisMonth} day={day} />}
                      </div>
                 </div>}
         </div>
            {/* {(hiddenNumber > 1 && !viewReflection) && <div className="mb-1 hover:text-orange-400" onClick={()=>doesThisWork()}>...</div>}
            {viewReflection && <div className="h-6 w-full flex justify-center">
            <div className="w-1/2 flex justify-between">
            <div>✏️</div>
            <div>⚡️</div>
            <div>🙂</div>
            </div>
          </div>} */}

            {(todaysEvents && todaysEvents.reflection.edited && window.innerHeight > 600) && <ReflectionDots openReflection={()=>setViewReflection(!viewReflection)}/>}
            {(todaysEvents && todaysEvents.reflection.edited) && <StressCorner date={date}/>}
            
       </div>
            
            )
}

export default Day;
