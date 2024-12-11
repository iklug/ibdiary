import { useSelector } from "react-redux";
import { selectWeeks } from "../redux/weekSlice";
import monthArray from "../utils/monthArray";
import constructMonth from "../utils/constructMonth";
import { selectCalendar } from "../redux/calendarSlice";
import getGraphData from "../utils/getGraphData";
import { selectMonth } from "../redux/monthSlice";
export default function GraphHeader({ children }) {
  const date = useSelector(selectMonth);
  const month = date.month;
  const year = date.year;

  console.log("😡", date);

  return (
    <header className="flex flex-none items-center justify-between border-b border-gray-100 px-6 py-4 bg-white">
      <h1 className="text-base font-semibold text-gray-900">
        <time dateTime="">{`${monthArray[month]} ${year}`}</time>
      </h1>
      <div className="flex items-center">{children}</div>
    </header>
  );
}
