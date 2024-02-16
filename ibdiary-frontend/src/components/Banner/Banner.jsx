import BannerLogo from "./BannerLogo";
import BannerProfile from "./BannerProfile";
import BannerButton from "./BannerButton";
import MonthAndYear from "./MonthAndYear";
import PreviousMonthButton from "./PreviousMonthButton";
import NextMonthButton from "./NextMonthButton";
import CalendarViewDropdown from "./CalendarViewDropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectView, selectToday, addViewing} from "../../redux/dateSlice";
import PreviousWeekButton from "./PreviousWeekButton";
import NextWeekButton from "./NextWeekButton";


const Banner = () => {


const [view, setView] = useState('Month');
const [viewDropdown, setViewDropdown] = useState(false);
const viewDate = useSelector(selectView);
const todaysDate = useSelector(selectToday);
const dispatch = useDispatch();

const changeView = (e) => {
    setView(e.target.textContent);
    setViewDropdown(false);
}

console.log('redux viewDate: ', viewDate);


    return (
        <div className="h-16 min-w-60 pl-3 pr-3 flex justify-between items-center shadow-sm">
            <div className=" w-96 flex items-center justify-between">
                < BannerLogo />
                <div className="flex items-center gap-4 min-w-60 pr-4">
                    < BannerButton name='Today' clickFunction={()=>{dispatch(addViewing(todaysDate))}}/>
                    {view === 'Month' && <PreviousMonthButton month={viewDate.month} />}
                    {view === 'Month' && <NextMonthButton month={viewDate.month}/>}
                    {view === 'Week' && <PreviousWeekButton month={viewDate.month} week={viewDate.week} totalWeeks={viewDate.weekAmount}/>}
                    {view === 'Week' && <NextWeekButton month={viewDate.month} week={viewDate.week} totalWeeks={viewDate.weekAmount}/>}
                    <MonthAndYear month={viewDate.month} year={viewDate.year} />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div id='viewMenu'>
                    <BannerButton name={view} clickFunction={()=>setViewDropdown(!viewDropdown)}/>
                    {viewDropdown && <CalendarViewDropdown changeView={changeView}/>}
                </div>
            <BannerProfile color={0} firstInitial={"K"}/>
            </div>
        </div>
    )
}

export default Banner;