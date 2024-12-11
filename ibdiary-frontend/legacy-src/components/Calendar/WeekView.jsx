import { useState, useEffect } from "react";
import arrayOfDaysInMonth from "../../utils/arrayOfDaysInMonth";
import findFirstDay from "../../utils/findFirstDay";
import Day from "./Day";
import buildCalendar from "../../utils/buildCalendar";
import DayOfTheWeek from "../DayOfTheWeek";
import dayNames from "../../utils/dayNames";
import { useDispatch, useSelector } from "react-redux";
import { selectView, addWeeks } from "../../redux/dateSlice";
import ViewHours from "./ViewHours";

const WeekView = ({year, month, today}) => {

    console.log('today: ', today)
    const week = useSelector(selectView).week;
    const dispatch = useDispatch();

    const [sixRows, setSixRows] = useState(null);
    const thisMonthDays = arrayOfDaysInMonth(year, month);
    const daysBefore = arrayOfDaysInMonth(year, month - 1);
    const nextMonthDays = arrayOfDaysInMonth(year, month + 1);
    const firstDay = findFirstDay(year, month);



    useEffect(()=>{
        if(thisMonthDays.length + firstDay > 35){
            setSixRows(true);
            dispatch(addWeeks(42));
        } else {
            setSixRows(false);
            dispatch(addWeeks(35));
        }
    }, [month]);



    const dayArray = buildCalendar(thisMonthDays, firstDay, daysBefore, nextMonthDays);



    const dayArrayMap = dayArray.map(x => <Day {...x} hours={true} key={`${x.year}-${x.month}-${x.day}`} />)
console.log('week: ', week)

    return (
        <div className={`flex flex-col monthCalSix text-gray-500`}>
            <div className="flex">
                {dayNames.map(x => <DayOfTheWeek day={x} key={x} />)}
            </div>
            <ViewHours />
            {(sixRows && week === 35) ? 
            <div className="flex flex-1">
            {dayArrayMap.slice(35,dayArray.length)}
         </div> :
            today.month === month ? 
                <div className="flex flex-1  ">
                {dayArrayMap.slice(week,week+7)}
             </div> :
             <div className="flex flex-1  ">
             {dayArrayMap.slice(week+7,week+14)}
          </div>    
        }
            {
            }
        </div>
    )
}

export default WeekView;