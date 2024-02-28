import { useDispatch, useSelector } from "react-redux";
import { addDay, deleteDay, removeEvent } from "../../redux/calendarSlice";
import { selectCalendar } from "../../redux/calendarSlice";
import fullDateFromString from "../../utils/fullDateFromString";
import { useState } from "react";



const EditEventDetails = ({title, type, startTime, endTime, repeat, dayId, eventId, close, date, renderOn, color}) => {

    console.log(date);

    const [newEventObj, setNewEventObj] = useState({
        title: title,
        type: type,
        originalDate: date,
        newDate: date,
        startTime: startTime,
        endTime: endTime,
        repeat: repeat,
        _id: eventId,
    });


    const backend = import.meta.env.MODE === 'development' ?  `http://localhost:3000` : ''; 

    const dispatch = useDispatch();
    const position = renderOn === 'left' ? 'right-[400px]' : 'left-[175px]';

    const submitEvent = async(backend, event) => {
        try {
            const request = await fetch(`${backend}/event/${eventId}`,{
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });
            if(!request.ok){
                throw new Error('request resulted in error @ submitEvent in AddEvent.jsx');
            }
            const data = await request.json();
            dispatch(removeEvent({date: event.originalDate, id: event._id}))
            dispatch(addDay({[data.date]:data}));
            close();
        } catch (error) {
            console.error(error);
        }
    }
   

    return (
        <div className={`text-gray-400 flex flex-col justify-start relative -top-3 ${position} h-48 w-96 bg-white rounded-md shadow-2xl z-10`}>
            <div className=" h-8 flex justify-end items-center gap-6 pr-4 pt-2">
                <div className="h-6 w-6 flex justify-center items-center bg-gray-50 shadow-sm hover:bg-gray-100 rounded-full" onClick={()=>close()}>
                    <div>X</div>
                </div>
            </div>
            <div>
                <div className="flex items-center h-12 gap-2 ml-2">
                    <div className={`${color} rounded-md h-3 w-3`}></div>

                    <input type="text" className="text-lg font-semibold appearance-none text-gray-600 outline-none border p-1 focus:border-blue-200" value={newEventObj.title} onChange={(e)=>setNewEventObj(prev => {return {...prev, title: e.target.value}})} />
                </div>
                <div className="flex items-center h-6 gap-2 ml-2">
                <div className={`rounded-md h-3 w-3`}></div>
                <input type="date" className="focus:outline-none w-32" value={newEventObj.newDate} onChange={(e)=>setNewEventObj(prev => { return {...prev, newDate:e.target.value}})} />
                    {startTime && <input type="time" value={newEventObj.startTime} className="w-28" onChange={(e)=>setNewEventObj(prev => {return {...prev, startTime: e.target.value}})} name="startTime"/>}
                </div>
            </div>
                <div className="flex items-end justify-center h-28 m-2">
                    <button className="h-8 w-20 rounded-lg bg-blue-400 text-white" onClick={()=>submitEvent(backend, newEventObj)}>Save</button>
                </div>
        </div>
    )
}

export default EditEventDetails;