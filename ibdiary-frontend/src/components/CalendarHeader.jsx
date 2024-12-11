import { useSelector } from "react-redux";
import { selectWeeks } from "../redux/weekSlice";
import monthArray from "../utils/monthArray";
import constructMonth from "../utils/constructMonth";
import { selectCalendar } from "../redux/calendarSlice";
import getGraphData from "../utils/getGraphData";
export default function CalendarHeader({ children }) {
  const displayedWeek = useSelector(selectWeeks);
  const month = displayedWeek[0].split("-")[1];
  const year = displayedWeek[0].split("-")[0];
  console.log("month bouus", month);
  return (
    <header className="flex flex-none items-center justify-between border-b border-gray-100 px-6 py-4 bg-white">
      <h1 className="text-base font-semibold text-gray-900">
        <time dateTime="">{`${monthArray[month - 1]} ${year}`}</time>
      </h1>
      <div className="flex items-center">{children}</div>
    </header>
  );
}
