import { useState } from "react";
import EventDetails from "./EventDetails";
import EditEventDetails from "./EditEventDetails";
import { addRepeatEvent, selectRepeatEvents } from "../../redux/repeatEventSlice";
import { useSelector, useDispatch } from "react-redux";
import repeatEvent from "../../utils/repeatEvent";

const Event = ({title, type, startTime, endTime, _id='123', dayId='123', date, repeat=0}) => {

const [viewEvent, setViewEvent] = useState(false);
const [renderOn, setRenderOn] = useState('left');
const [editEvent, setEditEvent] = useState(false);
const [hideRepeat, setHideRepeat] = useState(true);
console.log('never rendered????');
const dispatch = useDispatch();
const repeatEvents = useSelector(selectRepeatEvents);


const colorObj = {
    'event': 'bg-blue-300',
    'food': 'bg-green-400',
    'medication': 'bg-orange-300',
    'symptom': 'bg-red-400',
}

const thisEvent = {
    title,
    type,
    startTime,
    endTime,
    date,
    repeat,
    _id,
};

const showEventDetails = (e) => {
    if(e.clientX < 500){
        setRenderOn('right');
    }
    setViewEvent(!viewEvent);
}



if(repeat > 0) {
    if(repeatEvents[date]){
        const checkEvents = repeatEvents[date].find(x => x.title === title);
        console.log(checkEvents, 'yeayeay');
        if(checkEvents === undefined){
            const newRepeat = repeatEvent(thisEvent, date, repeatEvents);
            dispatch(addRepeatEvent(newRepeat));
        }
    } else {
        const newRepeat = repeatEvent(thisEvent, date, repeatEvents);
        dispatch(addRepeatEvent(newRepeat));
    }
}


console.log('are we repeating ',hideRepeat);

return (
    <div className="">
      {hideRepeat && (
        <div className="pl-1 flex justify-start items-center min-w-0 truncate">
          <div className={`${colorObj[type]} rounded-full h-2 w-2 min-w-0 shrink-0`} onClick={(e) => console.log(e.clientX)}></div>
          <div className="text-xs font-light min-w-0 pr-1 tracking-tighter shrink-0" onClick={showEventDetails}>{startTime}</div>
          <div className="text-xs font-normal truncate min-w-0" onClick={showEventDetails}>{title}</div>
          {viewEvent && 
            <div className="absolute">
              <EventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={() => setViewEvent(!viewEvent)} edit={() => setEditEvent(true)} />
            </div>
          }
          {editEvent && 
            <div className="absolute z-10">
              <EditEventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={() => setEditEvent(false)} />
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default Event;
// return (
//     <div className="pl-1 flex justify-start items-center min-w-0 truncate">
//         {hideRepeat && (<div className={`${colorObj[type]} rounded-full h-2 w-2 min-w-0 shrink-0`} onClick={(e)=>console.log(e.clientX)}></div>
//         <div className=" text-xs font-light min-w-0 pr-1 tracking-tighter shrink-0" onClick={showEventDetails}>{startTime}</div>
//         <div className=" text-xs font-normal truncate min-w-0 " onClick={showEventDetails}>{title}</div>
//         {viewEvent && 
//             <div className="absolute">
//                 <EventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={()=>setViewEvent(!viewEvent)} edit={()=>setEditEvent(true)} />
//             </div>
//         }
//         {editEvent && 
//             <div className="absolute z-10">
//                 <EditEventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={()=>setEditEvent(false)}  />
//             </div>
//         })}
//     </div>
// )