import DateButton from "./DateButton";
import today from "../utils/today";
import constructWeek from "../utils/constructWeek";
import { useDispatch, useSelector } from "react-redux";
import {
  addActive,
  addData,
  defaultView,
  selectActive,
  selectCalendar,
  selectViewing,
} from "../redux/calendarSlice";
import { getReflection } from "../redux/reflectionSlice";
import { addWeeks, selectWeeks } from "../redux/weekSlice";
import { addMonth } from "../redux/monthSlice";
import createMonthObject from "../utils/createMonthObject";

export default function CalendarWeek({ month, year, startDay }) {
  const dispatch = useDispatch();
  const displayedWeek = useSelector(selectWeeks);

  if (displayedWeek.length === 0) {
    const todaysDate = today();
    const week = constructWeek(...todaysDate);
    const monthObject = createMonthObject(week[0]);
    dispatch(addWeeks(week));
    dispatch(addMonth(monthObject));
  }
  const array = [0, 1, 2, 3, 4, 5, 6];

  const allData = useSelector(selectCalendar);
  const activeDay = useSelector(selectActive);
  if (!activeDay) {
    const dateString = today()[0];

    dispatch(addActive(dateString));
    dispatch(
      addData({
        [dateString]: {
          date: dateString,
          view: "Reflection",
          edit: true,
          entry: "",
          stress: null,
          symptoms: null,
        },
      })
    );
  }

  const viewing = useSelector(selectViewing);

  const executeSwitch = (data, date) => {
    if (data[date]) {
      dispatch(addActive(date));
      dispatch(defaultView());
    } else {
      const defaultData = {
        date: date,
        view: "Reflection",
        entry: "",
        edit: true,
        stress: null,
        symptoms: null,
      };

      dispatch(addData({ [date]: defaultData }));
      dispatch(addActive(date));
      console.log("bang!");
    }
  };

  const buttons = array.map((x) => (
    <DateButton
      weekday={x}
      number={displayedWeek[x].slice(8)}
      active={displayedWeek[x] === activeDay}
      action={() => executeSwitch(allData, displayedWeek[x])}
      key={displayedWeek[x]}
      stress={allData[displayedWeek[x]]?.stress}
    />
  ));

  return (
    <div className="flex justify-around text-sm/6 text-gray-500">{buttons}</div>
  );
}
