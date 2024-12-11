import { decrementMonth, decrementYear, decrementWeek } from "../../redux/dateSlice";
import { useDispatch } from "react-redux";

const PreviousWeekButton = ({month, week, totalWeeks}) => {
    const dispatch = useDispatch();
    
    const previousWeek = (month) => {
        
        if(month === 0 && week === 0){
            dispatch(decrementWeek());
            dispatch(decrementMonth());
            dispatch(decrementYear());
        } else if(week === 0) {
            dispatch(decrementWeek());
            dispatch(decrementMonth());
        } else {
            dispatch(decrementWeek());
        }
    }

    return (
        <div className=" h-7 w-7 rounded-full text-center text-lg text-gray-300 hover:text-gray-400 hover:shadow-sm transition-colors duration-150 select-none" onClick={()=>previousWeek(month)}>
            {`<`}
        </div>
    )
}


export default PreviousWeekButton;
