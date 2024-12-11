import { useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, updateTitle, updateDate, updateType, updateStart, updateEnd, selectNewEvent } from "../../redux/newEventSlice";
import { selectToday } from "../../redux/dateSlice";
import { addDay, selectCalendar, addBulk } from "../../redux/calendarSlice";
import ReactDOM from 'react-dom';
import AddReflection from "./AddReflection";

const AddEvent = ({closeEvent=(()=>console.log('')), defaultDate, reflection=false, closeReflection, hasReflection}) => {


    const [isMoving, setIsMoving] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [viewReflection, setViewReflection] = useState(reflection);
    const [errorMessage, setErrorMessage] = useState(false);
    const [newEventObj, setNewEventObj] = useState({
        title: '',
        type: 'event',
        date: defaultDate || undefined,
        startTime: undefined,
        endTime: undefined,
        repeat: undefined,
    });

    const apiURL = import.meta.env.MODE === 'production' ? 'https://ibdiary.fly.dev' : `http://localhost:3000`; 
    const calendar = useSelector(selectCalendar);

    const handleX = () => {
        closeEvent();
        closeReflection();
    }

    const handleClickInEvent = (e) => {
        e.stopPropagation();
    }

    const dispatch = useDispatch();

    const backend = import.meta.env.MODE === 'development' ?  `http://localhost:3000` : ''; 


    const handleMouseDown = (event) => {
        console.log('event target', event.currentTarget.parentElement);
        setIsMoving(true);
        setOffsetX(event.clientX - event.target.getBoundingClientRect().left);
        setOffsetY(event.clientY - event.target.getBoundingClientRect().top);
    }
    const handleMouseMove = (event) => {
        if(isMoving){
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;
            event.currentTarget.parentElement.style.left = x + 'px';
            event.currentTarget.parentElement.style.top = y + 'px';

        }
    }
    const handleMouseUp = () => {
        setIsMoving(false);
    }

    const submitEvent = async(apiURL, event) => {
        try {
            
            if(event.repeat > 0){
            const request = await fetch(`${apiURL}/event/repeating`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event),
            });
            if(!request.ok){12
                throw new Error('failed repeat event add @ AddEvent.jsx');
            }
            const data = await request.json();
            const fixData = data.reduce((acc,curr)=>{
                acc[curr.date] = curr;
                return acc;
            },{});
            dispatch(addDay(fixData));
            closeEvent();
            } else {
            const request = await fetch(`${apiURL}/event`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });
            if(!request.ok){
                throw new Error('title');
            }
            const data = await request.json();
            console.log('add normal event, line 98 in AddEVent', data);
            dispatch(addDay({[data.date]:data}));
            closeEvent();
}

        } catch (error) {
            console.error(error);
            setErrorMessage(true);
        }
    }

    return (
        <div className="absolute rounded-lg shadow-2xl h-96 w-96 left-1/4 top-1/4 bg-white overflow-hidden z-10  text-gray-500 text-sm font-normal" onClick={handleClickInEvent}>
        
                <div className="h-8 bg-gray-100 cursor-move z-10 flex justify-end gap-3 items-center"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                >
                </div>
                <div className="h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200 mr-2 transition-colors duration-150 ease-in text-sm cursor-default select-none float-right -mt-7" onClick={handleX}>X</div>
        
           {!viewReflection && <div className="bg-white flex flex-col select-none appearance-none gap-4 ml-6 mt-6 h-72">
                <input type="text" value={newEventObj.title}  className="border-b-2 border-blue-400 appearance-none focus:outline-none w-4/5" placeholder={errorMessage ? 'title required' : ''} onChange={(e)=>setNewEventObj((prev)=>{return {...prev, title: e.target.value}})}/>
                <div className="flex gap-2 mr-4">
                    {newEventObj.type === 'event' ? <div className="h-6 w-16 rounded-lg bg-blue-200 text-blue-700 text-center opacity-80 hover:opacity-100 flex justify-center items-center" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>event</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100  flex justify-center items-center" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>event</div>}
                    {newEventObj.type === 'food' ? <div className="h-6 w-16 rounded-lg  flex justify-center items-center bg-green-200 text-green-700 text-center opacity-80 hover:opacity-100" value='food' onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>food</div> :<div className="h-6 w-16 rounded-lg  flex justify-center items-center bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100" value='food' onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>food</div>}
                    {newEventObj.type === 'medication' ? <div className="h-6 w-16 rounded-lg bg-orange-200  flex justify-center items-center text-orange-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>medication</div> :<div className="h-6 w-16 rounded-lg  flex justify-center items-center bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>medication</div>}
                    {newEventObj.type === 'symptom' ? <div className="h-6 w-16 rounded-lg bg-red-200  flex justify-center items-center text-red-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>symptom</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100  flex justify-center items-center" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>symptom</div>}
                </div>
                <input type="date" className="focus:outline-none w-32" max='2120-12-31' value={newEventObj.date} onChange={(e)=>setNewEventObj(prev => { return {...prev, date:e.target.value}})} />
                <div>
                    {!startTime && <div className="h-6 w-24 border rounded-lg flex justify-center items-center" onClick={()=>setStartTime(true)}>set time</div>}
                    {startTime && <div className="flex gap-4">
                        <input type="time" value={newEventObj.startTime} className="w-28" onChange={(e)=>setNewEventObj(prev => {return {...prev, startTime: e.target.value}})} name="startTime"/>
                         {!endTime && <div className="h-6 w-32 border rounded-lg flex justify-center items-center" onClick={()=>setEndTime(true)}>set end time</div>}
                         {endTime && <input type="time" value={newEventObj.endTime} className="w-28" onChange={(e)=>setNewEventObj(prev => {return {...prev, endTime: e.target.value}})} name="startTime"/>}

                    </div>}
                </div>
                {(newEventObj.type === 'event' || newEventObj.type === 'medication') &&<div>
                    <select name="repeat" id="repeat" value={newEventObj.repeat} onChange={(e)=>setNewEventObj(prev => {return {...prev, repeat: e.target.value}})}>
                        <option value={0} >does not repeat</option>
                        <option value={1} >every week</option>
                        <option value={2} >every 2 weeks</option>
                        <option value={3} >every 3 weeks</option>
                        <option value={4} >every 4 weeks</option>
                        <option value={6} >every 6 weeks</option>
                        <option value={8}>every 8 weeks</option>
                    </select>
                </div>}
                {!hasReflection && <div className="ml-2 bg-purple-300 text-purple-800 w-36 flex justify-center rounded-full p-1" onClick={()=>setViewReflection(true)}>add reflection</div>}
               
            <div className="pr-2 w-full flex flex-1 justify-center items-end -mt-4">
                <Button size={'med'} color={0} name={'Save'} handleClick={()=>submitEvent(apiURL, newEventObj)}/>
            </div>
            </div>
            
            }
            {viewReflection && <AddReflection date={defaultDate} closeReflection={closeReflection}/>

            }
        </div>
    )
}

export default AddEvent;