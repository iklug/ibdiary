import classNames from "classnames";
import Scale from "./Scale";
import { useState } from "react";
import ReflectionTabs from "./ReflectionTabs";
import { useDispatch, useSelector } from "react-redux";
import { selectReflection } from "../redux/reflectionSlice";
import { getReflection } from "../redux/reflectionSlice";
import ViewReflection from "./ViewReflection";
import { selectViewing } from "../redux/calendarSlice";

export default function ReflectionContainer() {
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const reflection = useSelector(selectViewing);
  const dummyData = {
    date: "01-01-24",
    view: "Stress",
    stress: 3,
    symptoms: 4,
  };
  const colors = [
    "border-blue-300",
    "border-yellow-300",
    "border-orange-300",
    "border-red-300",
    "border-red-800",
  ];

  return (
    <div className="bg-gray-100 p-4 h-full overflow-hidden flex-grow-1">
      <div className=" bg-white h-full w-full shadow-lg rounded-lg pt-4 relative overflow-hidden flex flex-col">
        <ReflectionTabs />
        {reflection.view === "Reflection" ? <ViewReflection /> : <Scale />}
      </div>
    </div>
  );
}
