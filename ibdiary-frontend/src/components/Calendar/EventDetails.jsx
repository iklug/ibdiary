
const EventDetails = ({title, type, startTime, endTime}) => {
    return (
        <div className="text-gray-400 flex flex-col justify-start absolute -top-3 -left-96 h-48 w-96 bg-white rounded-md shadow-2xl">
            <div className=" h-8 flex justify-end items-center gap-6 pr-4 pt-2">
                <div className="h-6 w-12 bg-gray-100 hover:shadow-sm flex justify-center items-center rounded-lg">
                    <div className="">edit</div>
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