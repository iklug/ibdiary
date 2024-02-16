import { useSelector } from "react-redux";
import { selectToday } from "../../redux/dateSlice";
import Hour from "./Hour";

const Day = ({day, month, year, hours}) => {    

    const todayString = useSelector(selectToday).string;
    const blueCircle = `${year}-${month}-${day}` === todayString ? 'border-2 border-blue-300 pl-2 pr-2 rounded-full' : '';
    

    const today = new Date(year, month, day);
    const thisMonth = today.toLocaleString('default', {month: 'short'});
    
    return (
       <div className="border h-full w-full flex flex-col items-center pt-2 text-sm font-semibold select-none" id={`${year}-${month}-${day}`} onClick={(e)=>console.log(e.target.id)}>
           <div className={`${blueCircle} hover:text-blue-400 text-center h-6`} id='open id in single view'>{ day === 1 ? `${thisMonth} ${day}` : `${day}` }</div>
           {hours && <div className="flex flex-col flex-1 w-full border-gray-50">
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
               <Hour />
           </div>}
       </div>
            
    )
}

export default Day;

