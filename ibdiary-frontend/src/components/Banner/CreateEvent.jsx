import { openNewEvent } from "../../redux/newEventSlice";
import { useDispatch } from "react-redux";
import AddEvent from "../Calendar/AddEvent";



const CreateEvent = ({clickFunction, newEvent}) => {

    const dispatch = useDispatch();


    return (
        <div>
            <div className="h-8 w-16 bg-white  border text-gray-500 text-sm shadow-sm hover:text-blue-400 hover:shadow-md rounded-full flex justify-center items-center transition-all ease-in-out duration-150" onClick={clickFunction}>Create</div>
            {newEvent && <AddEvent closeEvent={clickFunction} hasReflection={true}/>}
        </div>
    )
} 

export default CreateEvent;