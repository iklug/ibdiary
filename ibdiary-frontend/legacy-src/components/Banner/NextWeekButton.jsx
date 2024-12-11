import { incrementMonth, incrementYear, incrementWeek } from "../../redux/dateSlice";
import { useDispatch } from "react-redux";

const NextWeekButton = ({month, week, totalWeeks}) => {
    console.log(totalWeeks);
    const dispatch = useDispatch();

    const endOfWeek = week + 14 === totalWeeks;
    const nextWeek = (month, endOfWeek) => {
        
        if(month === 11 && endOfWeek){
            dispatch(incrementWeek());
            dispatch(incrementMonth());
            dispatch(incrementYear());
        } else if(endOfWeek) {
            dispatch(incrementWeek());
            dispatch(incrementMonth());
        } else {
            dispatch(incrementWeek());
        }
    }

    return (
        <div className=" h-7 w-7 rounded-full text-center text-lg text-gray-300 hover:text-gray-400 hover:shadow-sm transition-colors duration-150 select-none" onClick={()=>nextWeek(month, endOfWeek)}>
            {`>`}
        </div>
    )
}


export default NextWeekButton;