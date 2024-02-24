import { useState } from "react";
import EventDetails from "./EventDetails";

const Event = ({title, type, startTime, endTime}) => {

const [viewEvent, setViewEvent] = useState(false);

const colorObj = {
    'event': 'bg-blue-300',
    'food': 'bg-green-400',
    'medication': 'bg-orange-300',
    'symptom': 'bg-red-400',
}   


    return (
        <div className="pl-1 flex justify-start items-center min-w-0 truncate" onClick={()=>setViewEvent(true)}>
            <div className={`${colorObj[type]} rounded-full h-2 w-2 min-w-0 shrink-0`}></div>
            <div className=" text-xs font-extralight min-w-0 pr-1 tracking-tighter shrink-0">{startTime}</div>
            <div className=" text-xs font-light truncate min-w-0">{title}</div>
            {viewEvent && <EventDetails title={title} type={colorObj[type]} startTime={startTime} endTime={endTime} />}
        </div>

    )
}

export default Event;