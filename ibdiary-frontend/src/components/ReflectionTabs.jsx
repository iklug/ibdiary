import { useState } from "react";
import ReflectionButtons from "./ReflectionButtons";
import { selectReflection } from "../redux/reflectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeView, selectViewing } from "../redux/calendarSlice";

export default function ReflectionTabs() {
  const dispatch = useDispatch();
  const reflection = useSelector(selectViewing);

  return (
    <div className="p-2 flex justify-evenly">
      <ReflectionButtons
        text="Reflection"
        active={reflection.view}
        action={() => dispatch(changeView("Reflection"))}
      />
      <ReflectionButtons
        text="Stress"
        active={reflection.view}
        action={() => dispatch(changeView("Stress"))}
      />
      <ReflectionButtons
        text="Symptoms"
        active={reflection.view}
        action={() => dispatch(changeView("Symptoms"))}
      />
    </div>
  );
}
