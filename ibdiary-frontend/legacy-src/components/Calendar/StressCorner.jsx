import { useSelector } from "react-redux";
import { selectCalendar, selectDay } from "../../redux/calendarSlice";



const StressCorner = ({date}) => {

const allDays = useSelector(selectCalendar);
const day = allDays[date].reflection;
const stressColors = ['bg-blue-200', 'bg-yellow-200', 'bg-orange-300', 'bg-red-400', 'bg-red-700'];



    return (
        <div className="relative h-2 w-full flex justify-end overflow-hidden -mt-1">

                <div className={`h-12 w-12 ${stressColors[day.stress]} translate-x-6 rounded-full`}></div>
        </div>
    )
}

export default StressCorner;