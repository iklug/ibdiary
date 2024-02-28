import { useState } from "react";
import EventDetails from "./EventDetails";
import EditEventDetails from "./EditEventDetails";


const Event = ({title, type, startTime, endTime, _id, dayId, date}) => {

const [viewEvent, setViewEvent] = useState(false);
const [renderOn, setRenderOn] = useState('left');
const [editEvent, setEditEvent] = useState(false);

const colorObj = {
    'event': 'bg-blue-300',
    'food': 'bg-green-400',
    'medication': 'bg-orange-300',
    'symptom': 'bg-red-400',
}   

const showEventDetails = (e) => {
    if(e.clientX < 500){
        setRenderOn('right');
    }
    setViewEvent(!viewEvent);
}


    return (
        <div className="pl-1 flex justify-start items-center min-w-0 truncate">
            <div className={`${colorObj[type]} rounded-full h-2 w-2 min-w-0 shrink-0`} onClick={(e)=>console.log(e.clientX)}></div>
            <div className=" text-xs font-extralight min-w-0 pr-1 tracking-tighter shrink-0">{startTime}</div>
            <div className=" text-xs font-light truncate min-w-0" onClick={showEventDetails}>{title}</div>
            {viewEvent && 
                <div className="absolute">
                    <EventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={()=>setViewEvent(!viewEvent)} edit={()=>setEditEvent(true)} />
                </div>
            }
            {editEvent && 
                <div className="absolute z-10">
                    <EditEventDetails title={title} type={type} color={colorObj[type]} startTime={startTime} endTime={endTime} eventId={_id} dayId={dayId} date={date} renderOn={renderOn} close={()=>setEditEvent(false)}  />
                </div>
            }
            </div>
    )
}

export default Event;