import BannerLogo from "./BannerLogo";
import BannerProfile from "./BannerProfile";
import BannerButton from "./BannerButton";
import MonthAndYear from "./MonthAndYear";
import CalendarViewDropdown from "./CalendarViewDropdown";
import { useState } from "react";

const Banner = () => {
    
const [view, setView] = useState('Month');
const [viewDropdown, setViewDropdown] = useState(false);

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
                    <MonthAndYear month={'February'} year={'2024'} />
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