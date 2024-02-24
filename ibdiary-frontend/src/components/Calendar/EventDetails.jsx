import { useDispatch } from "react-redux";
import { addDay, deleteDay } from "../../redux/calendarSlice";




const EventDetails = ({title, type, startTime, endTime, dayId, eventId, closeFunction}) => {

    const dispatch = useDispatch();

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

           closeFunction();
        } catch (error) {
           console.error(error);
        }
     };

     console.log(dayId, eventId);

    return (
        <div className="text-gray-400 flex flex-col justify-start absolute -top-3 -left-96 h-48 w-96 bg-white rounded-md shadow-2xl">
            <div className=" h-8 flex justify-end items-center gap-6 pr-4 pt-2">
                <div className="h-6 w-12 bg-gray-100 hover:shadow-sm flex justify-center items-center rounded-lg">
                    <div className="">edit</div>
                </div>
                <div className="h-6 w-12 bg-gray-100 hover:shadow-md flex justify-center items-center rounded-lg">
                    <div className=" select-none" onClick={deleteEvent}>trash</div>
                </div>
                <div className="h-6 w-6 flex justify-center items-center bg-gray-50 shadow-sm hover:bg-gray-100 rounded-full" >
                    <div>X</div>
                </div>
            </div>
            <div>{title}</div>
            <div>{startTime}-{endTime}</div>

        </div>
    )
}

export default EventDetails;