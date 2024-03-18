import { useDispatch, useSelector } from "react-redux";
import { addDay, deleteDay, removeEvent } from "../../redux/calendarSlice";
import { selectCalendar } from "../../redux/calendarSlice";
import fullDateFromString from "../../utils/fullDateFromString";
import { useState } from "react";
import ConfirmEditRepeatPopup from "./ConfirmEditRepeatPopup";



const EditRepeatingEventDetails = ({title, type, startTime, endTime, repeat, dayId, eventId, close, date, renderOn, color}) => {

    console.log(date);

    const [newEventObj, setNewEventObj] = useState({
        title: title,
        type: type,
        originalDate: date,
        newDate: date,
        startTime: startTime,
        endTime: endTime,
        newRepeat: repeat,
        repeat: repeat,
        _id: eventId,
        instances: 'single',
    });
    const [addEndTime, setAddEndTime] = useState(endTime);
    const [addStartTime, setAddStartTime] = useState(startTime);
    console.log('the new event object should change',newEventObj)

    const [allInstances, setAllInstances] = useState(true);
    const [confirm, setConfirm] = useState(false);

    const backend = import.meta.env.MODE === 'development' ?  `http://localhost:3000` : ''; 

    const dispatch = useDispatch();
    const position = renderOn === 'left' ? 'right-[400px]' : 'left-[175px]';

    const submitEvent = async(backend, event) => {
        try {

            if(event.repeat > 0){
                console.log('this is event.instance', event.instances);
                const request = await fetch(`${backend}/event/${eventId}/${event.instances}`,{
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event)
                });
                if(!request.ok){
                    throw new Error('accessing editRepeat in EditEventDetails failed');
                }
                const data = await request.json();
                console.log('data data all around me', data);
                if(event.instances === 'single'){

                    if(data.length){
                        const fixData = data.reduce((acc,curr)=>{
                            acc[curr.date] = curr;
                            return acc;
                        },{});
                        console.log('fix data in the house', fixData);
                        dispatch(addDay(fixData));
                        close();
                }
                else {
                    dispatch(addDay({[data.date]: date}));
                    close()
                }} else {
                    if(data.length){
                        const fixData = data.reduce((acc,curr)=>{
                            acc[curr.date] = curr;
                            return acc;
                        },{});
                        console.log('fix data in the house', fixData);
                        dispatch(addDay(fixData));
                        close();
                    } else {
                        window.location.reload();
                    }
                }
        
            } else {
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
                console.log('is something happening here')
                dispatch(removeEvent({date: event.originalDate, id: event._id}))
                dispatch(addDay({[data.date]:data}));
                close();

            }

        } catch (error) {
            console.error(error);
        }
    }
   

    return (
        <div className={`text-gray-400 flex flex-col justify-start relative -top-3 ${position} h-56 w-96 bg-white rounded-md shadow-2xl z-10`}>
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
                <div className="flex h-14 gap-2 ml-2">
                <div className={`rounded-md h-3 w-3`}></div>
                <input type="date" className="focus:outline-none w-32" value={newEventObj.newDate} onChange={(e)=>setNewEventObj(prev => { return {...prev, newDate:e.target.value}})} />
                    <div className="flex gap-2 items-center ">
                    {!addStartTime && 
                        <div className="h-6 w-32 rounded-lg border-gray-100 border flex justify-center" onClick={()=>setAddStartTime(true)}>
                            add start time    
                        </div>
                        }
                        {(startTime || addStartTime)&&<input type="time" value={newEventObj.startTime} className="w-26" onChange={(e)=>setNewEventObj(prev => {return {...prev, startTime: e.target.value}})} name="startTime"/>}

                        
                        {!addEndTime && addStartTime && 
                        <div className="h-6 w-32 rounded-lg border-gray-100 border flex justify-center" onClick={()=>setAddEndTime(true)}>
                            add end time    
                        </div>
                        }
                        {(endTime || addEndTime) &&
                        <div className="flex gap-2">
                            <div>
                                -
                            </div>
                            <div>
                            <input type="time" value={newEventObj.endTime} className="w-26" onChange={(e)=>setNewEventObj(prev => {return {...prev, endTime: e.target.value}})} name="endTime"/>
                            </div>
                        </div>

                        }
                    </div>
                    
                </div>
                <div className="flex ml-6">
                <select name="repeat" id="repeat" value={newEventObj.newRepeat} onChange={(e)=>setNewEventObj(prev => {return {...prev, newRepeat: e.target.value}})}>
                        <option value={0} >does not repeat</option>
                        <option value={1} >every week</option>
                        <option value={2} >every 2 weeks</option>
                        <option value={3} >every 3 weeks</option>
                        <option value={4} >every 4 weeks</option>
                        <option value={6} >every 6 weeks</option>
                        <option value={8}>every 8 weeks</option>
                    </select>
                </div>
            </div>
                <div className="flex items-end justify-center h-28 m-2">
                    <button className="h-8 w-20 rounded-lg bg-blue-400 text-white" onClick={()=>setConfirm(true)}>Save</button>
                </div>
                <div className="relative">{confirm && <ConfirmEditRepeatPopup changeInstance={(instance)=>setNewEventObj(prev => {return {...prev, instances: instance}})} cancelFunction={()=>setConfirm(false)} submit={()=>submitEvent(backend, newEventObj)} selected={newEventObj.instances}/>}</div>
        </div>
    )
}

export default EditRepeatingEventDetails;