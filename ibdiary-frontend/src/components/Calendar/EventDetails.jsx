import { useDispatch, useSelector } from "react-redux";
import { addDay, deleteDay } from "../../redux/calendarSlice";
import { selectCalendar } from "../../redux/calendarSlice";
import fullDateFromString from "../../utils/fullDateFromString";



const EventDetails = ({title, type, startTime, endTime, dayId, eventId, close, date, renderOn, edit, color}) => {

    const dispatch = useDispatch();
    console.log(renderOn);
    const deleteEvent = async() => {
        try {
           const request = await fetch(`http://localhost:3000/event/${dayId}/${eventId}`,{
              method: 'DELETE',
              credentials: 'include',
              headers: {
                 'Content-Type': 'application/json',
              }
           });
              if(!request.ok){
                 throw new Error('this delete thing is so not okay');
              }
           const data = await request.json();
           if(data.date){
            const updateEvents = {
                [data.date]: {
                    ...data
                }
            }
            dispatch(addDay(updateEvents));
           } else {
            dispatch(deleteDay(data));
           }

        } catch (error) {
           console.error(error);
        }
     };

     console.log(dayId, eventId);

     const position = renderOn === 'left' ? 'right-[400px]' : 'left-[175px]';

    return (
        <div className={`text-gray-400 flex flex-col justify-start relative -top-3 ${position} h-48 w-96 bg-white rounded-md shadow-2xl z-10`}>
            <div className=" h-8 flex justify-end items-center gap-6 pr-4 pt-2">
                <div className="h-6 w-12 bg-gray-100 hover:shadow-sm flex justify-center items-center rounded-lg">
                    <div className="" onClick={()=>edit()}>edit</div>
                </div>
                <div className="h-6 w-12 bg-gray-100 hover:shadow-md flex justify-center items-center rounded-lg">
                    <div className=" select-none" onClick={deleteEvent}>trash</div>
                </div>
                <div className="h-6 w-6 flex justify-center items-center bg-gray-50 shadow-sm hover:bg-gray-100 rounded-full" onClick={()=>close()}>
                    <div>X</div>
                </div>
            </div>
            <div>
                <div className="flex items-center h-12 gap-2 ml-2">
                    <div className={`${color} rounded-md h-3 w-3`}></div>
                    <div className="text-gray-600 text-lg overflow-x-auto">{title}</div>
                </div>
                <div className="flex items-center h-6 gap-2 ml-2">
                <div className={`rounded-md h-3 w-3`}></div>
                    <div>{fullDateFromString(date)}</div>
                    {startTime && <div>@ {startTime}</div>}
                </div>
            </div>

        </div>
    )
}

export default EventDetails;