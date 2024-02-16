import { incrementMonth, incrementYear } from "../../redux/dateSlice";
import { useDispatch } from "react-redux";



const NextMonthButton = ({month}) => {

    const dispatch = useDispatch();

    const nextMonth = (currentMonth) => {
        
        if(currentMonth === 11){
            dispatch(incrementMonth());
            dispatch(incrementYear());
        } else {
            dispatch(incrementMonth());
        }
    }

    return (
        <div className=" h-7 w-7 -ml-2 rounded-full text-center text-lg text-gray-300 hover:text-gray-400 hover:shadow-sm transition-colors duration-150 select-none" onClick={()=>nextMonth(month)}>
            {`>`}
        </div>
    )
}

export default NextMonthButton;