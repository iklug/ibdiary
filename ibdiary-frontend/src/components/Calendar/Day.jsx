import { useSelector } from "react-redux";
import { selectToday } from "../../redux/dateSlice";
import Hour from "./Hour";
import { selectCalendar, selectDay } from "../../redux/calendarSlice";
import Event from './Event';
import { useRef } from "react";
import arrangeByStartTime from "../../utils/arrangeByStartTime";


const Day = ({day, month, year, hours}) => {    

    const date = `${year}-${month}-${day}`;
    const events = useSelector(selectCalendar);
    const todaysEvents = events[date] ? events[date] : null;

    const parentNode = useRef(null);

    const todayString = useSelector(selectToday).string;
    const blueCircle = date === todayString ? 'border-2 border-blue-300 pl-2 pr-2 rounded-full' : '';
    
    const today = new Date(year, month, day);
    const thisMonth = today.toLocaleString('default', {month: 'short'});
     
    const sortedEvents = arrangeByStartTime(todaysEvents);
    console.log(sortedEvents)
    
    return (
       <div className="border h-full w-full flex flex-col items-center pt-2 text-sm font-semibold select-none min-w-0 text-clip" id={`${year}-${month}-${day}`} onClick={(e)=>console.log(e.target.id)}>
           <div className={`${blueCircle} hover:text-blue-400 text-center h-6 min-w-0`} id='open id in single view'>{ day === 1 ? `${thisMonth} ${day}` : `${day}` }</div>

               <div className=" max-h-32 min-w-0 w-full relative">
                   <div className="flex-col items-start w-full" ref={parentNode}>
                      {(sortedEvents && window.innerHeight > 900) &&
                        sortedEvents.slice(0,7).map(x => <Event {...x} />)
                      }
                      {(sortedEvents && window.innerHeight > 800 && window.innerHeight <= 900) &&
                        sortedEvents.slice(0,6).map(x => <Event {...x} />)
                      }
                      {(sortedEvents && window.innerHeight > 700 && window.innerHeight <= 800) &&
                        sortedEvents.slice(0,5).map(x => <Event {...x} />)
                      }
                      {
                        (sortedEvents && window.innerHeight > 600 && window.innerHeight <= 700) &&
                        sortedEvents.slice(0,4).map(x => <Event {...x} />)
                      }
                      {
                        (sortedEvents && window.innerHeight > 500 && window.innerHeight <= 600) &&
                        sortedEvents.slice(0,3).map(x => <Event {...x} />)
                      }
                      {
                        (sortedEvents && window.innerHeight > 450 && window.innerHeight <= 500) &&
                        sortedEvents.slice(0,2).map(x => <Event {...x} />)
                      }
                      {
                        (sortedEvents && window.innerHeight > 400 && window.innerHeight <= 450) &&
                        sortedEvents.slice(0,1).map(x => <Event {...x} />)
                      }

                    <div className=" font-bold text-xs pl-2 truncate">{(todaysEvents && parentNode.current && window.innerHeight > 350 && (todaysEvents.events.length !== parentNode.current.children.length - 1)) 
                    && (todaysEvents.events.length - parentNode.current.children.length + 1) + ' more'}</div>   
                    </div>
                   
               </div>
       </div>
            
            )
}

export default Day;
