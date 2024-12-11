import { decrementMonth, decrementYear } from "../../redux/dateSlice";
import { useDispatch } from "react-redux";

const PreviousMonthButton = ({month}) => {
    const dispatch = useDispatch();

    const previousMonth = (month) => {
        if(month === 0){
            dispatch(decrementMonth());
            dispatch(decrementYear());
        } else {
            dispatch(decrementMonth());
        }
    }

    return (
        <div className=" h-7 w-7 rounded-full text-center text-lg text-gray-300 hover:text-gray-400 hover:shadow-sm transition-colors duration-150 select-none" onClick={()=>previousMonth(month)}>
            {`<`}
        </div>
    )
}


export default PreviousMonthButton;


