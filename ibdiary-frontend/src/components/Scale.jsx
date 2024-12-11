import { useState } from "react";
import ScaleButton from "./ScaleButton";
import SemiCircleDetail from "./SemiCircleDetail";
import { useDispatch, useSelector } from "react-redux";
import { selectReflection } from "../redux/reflectionSlice";
import {
  addStress,
  addSymptoms,
  selectActive,
  selectViewing,
} from "../redux/calendarSlice";
export default function Scale() {
  const dispatch = useDispatch();
  const reflection = useSelector(selectReflection);
  const active = useSelector(selectActive);
  const currentDay = useSelector(selectViewing);

  const changeValue = (value, reflection) => {
    if (currentDay.view === "Stress") {
      return dispatch(addStress(value));
    }
    if (currentDay.view === "Symptoms") {
      return dispatch(addSymptoms(value));
    }
  };

  const relevantValue =
    currentDay.view === "Stress" ? currentDay?.stress : currentDay?.symptoms;

  const statement =
    currentDay.view === "Stress"
      ? "How is your stress?"
      : "How are your symptoms?";

  return (
    <div className="h-full w-full p-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="font-semibold text-gray-800 text-lg">{statement}</div>
      <ScaleButton
        action={() => changeValue(0, currentDay)}
        severity={0}
        color="bg-blue-200"
        active={relevantValue}
        text="None"
      />
      <ScaleButton
        action={() => changeValue(1, currentDay)}
        severity={1}
        text="Mild"
        color="bg-yellow-200"
        active={relevantValue}
      />
      <ScaleButton
        action={() => changeValue(2, currentDay)}
        severity={2}
        text="Moderate"
        color="bg-orange-200"
        active={relevantValue}
      />
      <ScaleButton
        action={() => changeValue(3, currentDay)}
        severity={3}
        text="Severe"
        color="bg-red-300"
        active={relevantValue}
      />
      <ScaleButton
        action={() => changeValue(4, currentDay)}
        severity={4}
        text="Extreme"
        color="bg-red-800"
        active={relevantValue}
        font="white"
      />
      <SemiCircleDetail active={relevantValue} />
    </div>
  );
}
