import { useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { selectToday } from "../../redux/dateSlice";
import { addDay, selectCalendar } from "../../redux/calendarSlice";

const AddReflection = ({date, closeReflection}) => {

    const calendar = useSelector(selectCalendar);
    const currentReflection = calendar[date] ? calendar[date].reflection : {body: '', stress: 0, emotions: '', edited: false};

    const [selected, setSelected] = useState(0);
    const [reflectionObj, setReflectionObj] = useState({
        body: currentReflection.body,
        stress: currentReflection.stress,
        emotions: currentReflection.emotion,
        edited: true,
        date: date,
    });
    console.log(reflectionObj);
    const dispatch = useDispatch();

    const submitReflection = async(obj) => {
        try {
            const request = await fetch(`http://localhost:3000/event/reflection`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if(!request.ok){
                throw new Error('error triggered in AddReflection @ submitReflection func')
            }
            const data = await request.json();
            console.log(data);
            dispatch(addDay({[data.date]:data}));
            closeReflection();
        } catch (error) {
            console.error(error);
        }
    }

    const dateSplitter = (date) => {
        const splitDate = date.split('-');
        const month = splitDate[1] - 1;
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December',]
        return `${months[month]} ${splitDate[2]}, ${splitDate[0]}`
    }

    return (
        <div className="bg-white flex flex-col select-none appearance-none gap-4 ml-6 mt-6 h-72">
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-600 font-semibold">Reflection for</div>
                    {/* <input type="date" value={reflectDate} className="outline-none w-28 text-blue-500" onChange={(e)=>setReflectDate(e.target.value)}/> */}
                    <div className="text-sm font-semibold text-blue-400">{dateSplitter(date)}</div>
                </div>
                <textarea rows='5' cols='40' placeholder="How's the day going?" value={reflectionObj.body} className="mr-6 outline-none resize-none p-2 focus:border focus:border-blue-200" onChange={(e)=>setReflectionObj(prev => ({...prev, body:e.target.value}))}></textarea>
                <div className="flex gap-2 items-center">
                    <div className="font-semibold">Stress level:</div>
                    <div className={`${reflectionObj.stress === 0 && 'bg-blue-200 text-blue-800'} h-8 w-8 rounded-full flex justify-center items-center`} onClick={()=>setReflectionObj(prev => ({...prev, stress: 0}))}>0</div>
                    <div className={`${reflectionObj.stress === 1 && 'bg-yellow-200 text-yellow-800'} h-8 w-8 rounded-full flex justify-center items-center`} onClick={()=>setReflectionObj(prev => ({...prev, stress: 1}))}>1</div>
                    <div className={`${reflectionObj.stress=== 2 && 'bg-orange-300 text-orange-800'} h-8 w-8 rounded-full flex justify-center items-center`} onClick={()=>setReflectionObj(prev => ({...prev, stress: 2}))}>2</div>
                    <div className={`${reflectionObj.stress === 3 && 'bg-red-400 text-gray-100'} h-8 w-8 rounded-full flex justify-center items-center`} onClick={()=>setReflectionObj(prev => ({...prev, stress: 3}))}>3</div>
                    <div className={`${reflectionObj.stress === 4 && 'bg-red-700 text-gray-50'} h-8 w-8 rounded-full flex justify-center items-center `} onClick={()=>setReflectionObj(prev => ({...prev, stress: 4}))}>4</div>
                </div>
                <div className="flex gap-2">
                    <div className="font-semibold">Emotions:</div>
                    <input type="text" value={reflectionObj.emotions} className="outline-none border-b w-full mr-24 focus:border-b-blue-300" onChange={(e)=>setReflectionObj(prev => ({...prev, emotions:e.target.value}))}/>
                </div>
                <div className="flex justify-center w-full h-16 items-end">
                    <Button size={'med'} color={0} name={'Save'} handleClick={()=>submitReflection(reflectionObj)}/>
                </div>

        </div>
    )
}

export default AddReflection;