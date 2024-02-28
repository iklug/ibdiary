import Event from "./Event";

const ViewAllEvents = ({events, dayId, date, close, thisMonth, day}) => {

    console.log('date in view all events',date);

    return (
        <div className="absolute -left-[100px] top-0 shadow-2xl h-56 w-56 z-10 bg-white p-2">
            <div className="flex justify-between gap-6 items-center mb-2" id="banner">
                <div className="flex gap-1">
                    <div>{thisMonth}</div>
                    <div>{day}</div>
                </div>
                <div className="rounded h-6 w-6 hover:bg-gray-200 flex justify-center items-center" onClick={()=>close()}>X</div>
            </div>
            <div className="overflow-scroll max-h-44">{events.map(event => <Event {...event} key={event._id} date={date} dayId={dayId} />)}</div>
        </div>

    )
}

export default ViewAllEvents;