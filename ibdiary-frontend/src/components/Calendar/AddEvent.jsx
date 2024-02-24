import { useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, updateTitle, updateDate, updateType, updateStart, updateEnd, selectNewEvent } from "../../redux/newEventSlice";
import { selectToday } from "../../redux/dateSlice";
import { addDay } from "../../redux/calendarSlice";

const AddEvent = ({closeEvent}) => {


    const [isMoving, setIsMoving] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [startTime, setStartTime] = useState(false);

    const [newEventObj, setNewEventObj] = useState({
        title: '',
        type: 'event',
        date: undefined,
        startTime: undefined,
        endTime: undefined,
        repeat: undefined,
    });

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

    const submitEvent = async(backend, event) => {
        try {
            const request = await fetch(`${backend}/event`,{
                method: 'POST',
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
            dispatch(addDay({[newEventObj.date]:data}));
            closeEvent();
            console.log(data);


        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="absolute rounded-lg shadow-2xl h-96 w-96 left-1/4 top-1/4 bg-white overflow-hidden z-10">
        
                <div className="h-8 bg-gray-100 cursor-move z-10 flex justify-end gap-3 items-center"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                >
                </div>
                <div className="h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200 mr-2 transition-colors duration-150 ease-in text-sm cursor-default select-none float-right -mt-7" onClick={closeEvent}>X</div>
        
            <div className="bg-white flex flex-col select-none appearance-none gap-4 ml-6 mt-6 h-72">
                <input type="text" value={newEventObj.title}  className="border-b-2 border-blue-400 appearance-none focus:outline-none w-4/5" onChange={(e)=>setNewEventObj((prev)=>{return {...prev, title: e.target.value}})}/>
                <div className="flex gap-2 mr-4">
                    {newEventObj.type === 'event' ? <div className="h-6 w-16 rounded-lg bg-blue-200 text-blue-700 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>event</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>event</div>}
                    {newEventObj.type === 'food' ? <div className="h-6 w-16 rounded-lg bg-green-200 text-green-700 text-center opacity-80 hover:opacity-100" value='food' onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>food</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100" value='food' onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>food</div>}
                    {newEventObj.type === 'medication' ? <div className="h-6 w-16 rounded-lg bg-orange-200 text-orange-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>medication</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>medication</div>}
                    {newEventObj.type === 'symptom' ? <div className="h-6 w-16 rounded-lg bg-red-200 text-red-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>symptom</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={(e)=>setNewEventObj((prev)=>{return{...prev, type:e.target.textContent}})}>symptom</div>}
                </div>
                <input type="date" className="focus:outline-none w-32" value={newEventObj.date} onChange={(e)=>setNewEventObj(prev => { return {...prev, date:e.target.value}})} />
                <div>
                    {!startTime && <div className="h-6 w-16 border" onClick={()=>setStartTime(true)}>set time</div>}
                    {startTime && <input type="time" value={newEventObj.startTime} className="w-28" onChange={(e)=>setNewEventObj(prev => {return {...prev, startTime: e.target.value}})} name="startTime"/>}
                </div>
                {(newEventObj.type === 'event' || newEventObj.type === 'medication') &&<div>
                    <select name="repeat" id="repeat" value={newEventObj.repeat} onChange={(e)=>setNewEventObj(prev => {return {...prev, repeat: e.target.value}})}>
                        <option value="undefined">does not repeat</option>
                        <option value="every week">every week</option>
                        <option value="every 2 weeks">every 2 weeks</option>
                        <option value="every 3 weeks">every 3 weeks</option>
                        <option value="every 4 weeks">every 4 weeks</option>
                        <option value="every 6 weeks">every 6 weeks</option>
                        <option value='every 8 weeks'>every 8 weeks</option>
                    </select>
                </div>}
                
               
            </div>
            <div className="pr-2 w-full flex flex-1 justify-center items-end -mt-4">
                <Button size={'med'} color={0} name={'Save'} handleClick={()=>submitEvent(backend, newEventObj)}/>
            </div>
        </div>
    )
}

export default AddEvent;