import BannerLogo from "./BannerLogo";
import BannerProfile from "./BannerProfile";
import BannerButton from "./BannerButton";
import MonthAndYear from "./MonthAndYear";
import PreviousMonthButton from "./PreviousMonthButton";
import NextMonthButton from "./NextMonthButton";
import CalendarViewDropdown from "./CalendarViewDropdown";
import { useState } from "react";
import { useSelector } from "react-redux";
import {selectView, selectToday} from "../../redux/dateSlice";

const Banner = () => {
    
const [view, setView] = useState('Month');
const [viewDropdown, setViewDropdown] = useState(false);
const viewDate = useSelector(selectView);
const changeView = (e) => {
    setView(e.target.textContent);
    setViewDropdown(false);
}


    return (
        <div className="h-16 min-w-60 pl-3 pr-3 flex justify-between items-center shadow-sm">
            <div className=" w-96 flex items-center justify-between">
                < BannerLogo />
                <div className="flex items-center gap-4 min-w-60 pr-4">
                    < BannerButton name='Today' />
                    <PreviousMonthButton month={viewDate.month} />
                    <NextMonthButton month={viewDate.month}/>
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