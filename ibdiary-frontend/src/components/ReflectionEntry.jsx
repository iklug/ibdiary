import { useSelector } from "react-redux";
import { addEntry, selectReflection } from "../redux/reflectionSlice";
import { selectViewing } from "../redux/calendarSlice";
export default function ReflectionEntry({ entry }) {
  const reflection = useSelector(selectViewing);

  return (
    <div className="h-full p-2 w-full overflow-scroll">
      {reflection.entry === "" ? "Nothing here quite yet." : reflection.entry}
    </div>
  );
}
