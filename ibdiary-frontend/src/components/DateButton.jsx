import dayNamesSingle from "../utils/dayNamesSingle";
import classNames from "classnames";
import colors from "../utils/colors";
export default function DateButton({
  weekday,
  number,
  active,
  action,
  stress,
}) {
  console.log("👋", stress);
  return (
    <button
      type="button"
      className="flex flex-col items-center pb-3 pt-2"
      onClick={action}
    >
      {dayNamesSingle[weekday]}
      {active ? (
        <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
          {number[0] === "0" ? number[1] : number}
        </span>
      ) : (
        <span
          className={classNames(
            stress ? `${colors[stress]} border-2 rounded-full` : "",
            stress === 0 ? `${colors[stress]} border-2 rounded-full` : "",
            "mt-1 flex size-8 items-center justify-center font-semibold text-gray-900"
          )}
        >
          {number[0] === "0" ? number[1] : number}
        </span>
      )}
    </button>
  );
}
