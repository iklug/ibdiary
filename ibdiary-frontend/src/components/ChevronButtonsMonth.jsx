import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import today from "../utils/today";
import constructWeek from "../utils/constructWeek";
import { useDispatch, useSelector } from "react-redux";
import { selectWeeks } from "../redux/weekSlice";
import { addWeeks } from "../redux/weekSlice";
import { addMonth, selectMonth } from "../redux/monthSlice";
import { addMonths, subMonths, format } from "date-fns";
import createMonthObject from "../utils/createMonthObject";

export default function ChevronButtonsMonth() {
  const dispatch = useDispatch();
  const weeks = useSelector(selectWeeks);
  const currentMonth = useSelector(selectMonth);

  const clickPrevious = (day) => {
    const previousMonth = subMonths(
      new Date(currentMonth.year, currentMonth.month, currentMonth.day),
      1
    );
    const previousMonthString = format(previousMonth, "yyyy-MM-dd");
    const previousMonthObject = createMonthObject(previousMonthString);

    dispatch(addMonth(previousMonthObject));
  };

  const clickNext = (day) => {
    const nextMonth = addMonths(
      new Date(currentMonth.year, currentMonth.month, currentMonth.day),
      1
    );
    const nextMonthString = format(nextMonth, "yyyy-MM-dd");
    const nextMonthObject = createMonthObject(nextMonthString);

    dispatch(addMonth(nextMonthObject));
  };

  return (
    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
      <button
        type="button"
        className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
        onClick={() => clickPrevious(weeks[0])}
      >
        <span className="sr-only">Previous week</span>
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
      </button>

      <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
      <button
        type="button"
        className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
        onClick={() => clickNext(weeks[6])}
      >
        <span className="sr-only">Next week</span>
        <ChevronRightIcon className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
