import BannerProfile from "./BannerProfile";
import Button from "./Button";
import TodayButton from "./TodayButton";
const Banner = () => {
    return (
        <div className="h-16 min-w-60 pl-3 pr-3 flex justify-between items-center shadow-sm">
            <div className=" h-12 bg-blue-400 px-2 flex items-center rounded-md relative overflow-hidden">
            <div className=" h-32 w-32 bg-blue-500 rounded-full absolute left-8"></div>   
                <div className="text-white font-semibold z-10 select-none">IBDiary</div>
            </div>
            < TodayButton />
            <BannerProfile color={0} firstInitial={"K"}/>
        </div>
    )
}

export default Banner;