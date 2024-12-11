import Event from "./Event";

const ViewAllEvents = ({events, dayId, date, close, thisMonth, day}) => {

    console.log('date in view all events',date);

    return (
        <div className=" h-screen w-screen bg-gray-700 bg-opacity-60 fixed top-16 left-0 flex justify-center items-center z-10">
            <div className="shadow-2xl mb-10 h-56 w-56 bg-white p-2 rounded-md">
                <div className="flex justify-between gap-6 items-center mb-2" id="banner">
                    <div className="flex gap-1">
                        <div>{thisMonth}</div>
                        <div>{day}</div>
                    </div>
                    <div className="rounded h-6 w-6 hover:bg-gray-200 flex justify-center items-center" onClick={()=>close()}>X</div>
                </div>
                <div className="overflow-scroll max-h-44">{events.map(event => <Event {...event} key={event._id} date={date} dayId={dayId} />)}</div>
            </div>
        </div>

    )
}

export default ViewAllEvents;