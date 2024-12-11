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

export default function ChevronButtons() {
  const dispatch = useDispatch();
  const weeks = useSelector(selectWeeks);
  console.log("what are we", weeks);

  // const previousWeek = constructWeek(weeks[0], 7).slice(0, 7);
  // const nextWeek = constructWeek(weeks[6], -1).slice(1);

  const clickPrevious = (day) => {
    const previousWeek = constructWeek(day, 7).slice(0, 7);
    dispatch(addWeeks(previousWeek));
  };

  const clickNext = (day) => {
    const nextWeek = constructWeek(day, -1).slice(1);
    dispatch(addWeeks(nextWeek));
  };
  console.log(weeks[0]);
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
