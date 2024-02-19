import { useState } from "react";
import Button from "../Button";



const AddEvent = () => {

    const [isMoving, setIsMoving] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [startTime, setStartTime] = useState(false);
    const [recurring, setRecurring] = useState(false);
    const [type, setType] = useState('event');

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

    const handleSelection = (e) => {
        console.log(e.target.textContent)
        setType(e.target.textContent)
    }


    return (
        <div className="absolute rounded-lg shadow-2xl h-96 w-96 left-1/4 top-1/4 bg-white overflow-hidden z-10">
            <div className="h-8 bg-gray-100 z-10 flex justify-end gap-3 items-center"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            >
                <div className="h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200 mr-2 transition-colors duration-150 ease-in select-none">X</div>
            </div>
            <div className="bg-white flex flex-col select-none appearance-none gap-4 ml-6 mt-6 h-72">
                <input type="text"  className="border-b-2 border-blue-400 appearance-none focus:outline-none w-4/5"/>
                <div className="flex gap-2 mr-4">
                    {type === 'event' ?<div className="h-6 w-16 rounded-lg bg-blue-200 text-blue-700 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>event</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>event</div>}
                    {type === 'food' ?<div className="h-6 w-16 rounded-lg bg-green-200 text-green-700 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>food</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>food</div>}
                    {type === 'medication' ?<div className="h-6 w-16 rounded-lg bg-orange-200 text-orange-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>medication</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>medication</div>}
                    {type === 'symptom' ?<div className="h-6 w-16 rounded-lg bg-red-200 text-red-700 flex-1 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>symptom</div> :<div className="h-6 w-16 rounded-lg bg-gray-100 flex-1 text-gray-600 text-center opacity-80 hover:opacity-100" onClick={handleSelection}>symptom</div>}
                </div>
                <input type="date" className="focus:outline-none w-32" />
                <div>
                    {!startTime && <div className="h-6 w-16 border" onClick={()=>setStartTime(true)}>set time</div>}
                    {startTime && <input type="time" className="w-28" name="startTime"/>}
                </div>
                {(type === 'event' || type === 'medication') &&<div>
                    <select name="repeat" id="repeat">
                        <option value="does not repeat">does not repeat</option>
                        <option value="every week">every week</option>
                        <option value="every 2 weeks">every 2 weeks</option>
                        <option value="every 3 weeks">every 3 weeks</option>
                        <option value="every 4 weeks">every 4 weeks</option>
                        <option value="every 6 weeks">every 6 weeks</option>
                        <option value="every 8 weeks">every 8 weeks</option>
                    </select>
                </div>}
                
               
            </div>
            <div className="pr-2 w-full flex flex-1 justify-center items-end -mt-4">
                <Button size={'med'} color={0} name={'Save'}/>
            </div>
        </div>
    )
}

export default AddEvent;