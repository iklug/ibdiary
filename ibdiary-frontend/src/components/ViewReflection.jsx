import { useDispatch, useSelector } from "react-redux";
import { selectReflection } from "../redux/reflectionSlice";
import { useState } from "react";
import ReflectionEntry from "./ReflectionEntry";
import { selectViewing, addEntry, changeEdit } from "../redux/calendarSlice";

export default function ViewReflection() {
  const reflection = useSelector(selectViewing);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(true);

  return (
    <div className="h-full flex p-6 flex-col gap-4 overflow-scroll">
      {reflection.edit ? (
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={reflection.entry}
          placeholder="How have you been?"
          className="p-4 border shadow-inner rounded-lg focus:outline-none flex-1"
          onChange={(e) => dispatch(addEntry(e.target.value))}
        ></textarea>
      ) : (
        <ReflectionEntry />
      )}

      {reflection.edit ? (
        <div
          className="w-full px-4 py-2 text-center bg-indigo-600 text-lg text-gray-50 rounded-lg "
          onClick={() => dispatch(changeEdit(false))}
        >
          Save
        </div>
      ) : (
        <div
          className="w-full px-4 py-2 text-center bg-gray-200 text-lg text-gray-800 rounded-lg "
          onClick={() => dispatch(changeEdit(true))}
        >
          Edit
        </div>
      )}
    </div>
  );
}
