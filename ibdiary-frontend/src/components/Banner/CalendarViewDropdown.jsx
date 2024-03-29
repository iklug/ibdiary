
const CalendarViewDropdown = ({changeView}) => {

    return (
        <div className="text-gray-400 flex flex-col justify-start absolute top-14 h-28 w-24 bg-white rounded-md drop-shadow-md overflow-hidden z-20">
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100" onClick={changeView}>Day</div>   
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100" onClick={changeView}>Week</div>
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100" onClick={changeView}>Month</div>
        </div>
    )
}

export default CalendarViewDropdown;