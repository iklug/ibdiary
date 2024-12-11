import { addDay } from "../redux/calendarSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const submitEvent = async(backend, event) => {
    try {
        const request = await fetch(`${backend}/event`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        });
        if(!request.ok){
            throw new Error('request resulted in error @ submitEvent in AddEvent.jsx');
        }
        const data = await request.json();
        console.log(data);
        
    } catch (error) {
        console.error(error);
    }
}

export default submitEvent;