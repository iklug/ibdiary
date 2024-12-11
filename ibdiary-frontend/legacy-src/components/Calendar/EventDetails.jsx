import { useDispatch, useSelector } from "react-redux";
import { addDay, deleteDay } from "../../redux/calendarSlice";
import { selectCalendar } from "../../redux/calendarSlice";
import fullDateFromString from "../../utils/fullDateFromString";
import { useState } from "react";
import ConfirmEditRepeatPopup from "./ConfirmEditRepeatPopup";


const EventDetails = ({title, type, startTime, endTime, dayId, eventId, close, date, renderOn, edit, color, repeat}) => {


    const dispatch = useDispatch();
    const [instance, setInstance] = useState('single');
    const [confirm, setConfirm] = useState(false);

    const apiURL = import.meta.env.MODE === 'production' ? 'https://ibdiary.fly.dev' : `http://localhost:3000`; 


    const deleteEvent = async() => {
        try {

            if(repeat > 0 && instance === 'single'){
                const request = await fetch(`${apiURL}/event/repeat/single`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: eventId,
                        date: date,
                    }),
                });
                if(!request.ok){
                    throw new Error('error in delete event @ EventDetails');
                }
                const data = await request.json();
                console.log('attempting to delete a single repeat event',data.repeatingEvents);
                dispatch(addDay({[data.date]: data}));
            } 
            
            if(repeat > 0 && instance === 'all'){
                const request = await fetch(`${apiURL}/event/repeat/all`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: eventId,
                        date: date,
                    }),
                });
                if(!request.ok){
                    throw new Error('error in delete event @ EventDetails');
                }
                window.location.reload();
            }
            
            else {

                const request = await fetch(`${apiURL}/event/${eventId}`,{
                   method: 'DELETE',
                   credentials: 'include',
                   headers: {
                      'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                     date: date,
                   })
                });
                   if(!request.ok){
                      throw new Error('this delete thing is so not okay');
                   }
                const data = await request.json();
     
                 const updateEvents = {
                     [data.date]: {
                         ...data
                     }
                 }
                 dispatch(addDay(updateEvents));
                
            }
            

        } catch (error) {
           console.error(error);
        }
     };

    const handleTrash = () => {
        if(repeat > 0){
            setConfirm(true);
        } else {
            deleteEvent();
        }
    };

     const position = renderOn === 'left' ? 'right-[400px]' : 'left-[175px]';

    return (
        <div className={`text-gray-400 flex flex-col justify-start relative -top-3 ${position} h-48 w-96 bg-white rounded-md shadow-2xl z-10`}>
            <div className=" h-8 flex justify-end items-center gap-6 pr-4 pt-2">
                <div className="h-6 w-12 bg-gray-100 hover:shadow-sm flex justify-center items-center rounded-lg">
                    <div className="" onClick={()=>edit()}>edit</div>
                </div>
                <div className="h-6 w-12 bg-gray-100 hover:shadow-md flex justify-center items-center rounded-lg">
                    <div className=" select-none" onClick={handleTrash}>trash</div>
                </div>
                <div className="h-6 w-6 flex justify-center items-center bg-gray-50 shadow-sm hover:bg-gray-100 rounded-full" onClick={()=>close()}>
                    <div>X</div>
                </div>
            </div>
            <div>
                <div className="flex items-center h-12 gap-2 ml-2">
                    <div className={`${color} rounded-md h-3 w-3`}></div>
                    <div className="text-gray-600 text-lg overflow-x-auto">{title}</div>
                </div>
                <div className="flex flex-col items-start h-6 gap-2 ml-4">
                <div className={`rounded-md h-3 w-3`}></div>
                    <div className="flex gap-2">
                        <div>{fullDateFromString(date)}</div>
                        {startTime && <div className='flex gap-2'>
                            <div>@ {startTime}</div>
                        {endTime && <div>-</div>}
                        {endTime && <div>{`${endTime}`}</div>}
                        </div>}
                    </div>
                    {(repeat > 0) &&<div>Repeats every {repeat < 2 ? '' : repeat} week{repeat > 1 && 's'}</div>}
                </div>
            </div>
            <div className="relative">{confirm && <ConfirmEditRepeatPopup changeInstance={(instance)=>setInstance(instance)} cancelFunction={()=>setConfirm(false)} submit={()=>deleteEvent()} selected={instance}/>}</div>
        </div>
    )
}

export default EventDetails;