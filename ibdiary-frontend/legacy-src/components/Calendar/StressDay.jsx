import { useSelector } from "react-redux";
import { selectCalendar } from "../../redux/calendarSlice";


const StressView = ({date}) => {
    
    const allDays = useSelector(selectCalendar);
    const reflection = allDays[date].reflection.edited ? allDays[date].reflection : false;

    const colorPalette = ['','','','',''];



    return (
        <div className="h-full w-full">
            {reflection ? 
                <div className={`${colorPalette[reflection.stress]} h-full w-full`}>
                    <div>{reflection.emotion}</div>
                </div> 
            :
            <div>
                <div>
                    +
                </div>
            </div>}
        </div>
    )
}

export default StressView;