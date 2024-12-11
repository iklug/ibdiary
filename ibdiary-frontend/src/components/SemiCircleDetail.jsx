import colors from "../utils/colors";
import classNames from "classnames";
export default function SemiCircleDetail({ active }) {
  console.log(active);
  return (
    <div
      className={classNames(
        active !== null ? `${colors[active]}` : `border-gray-200`,
        "absolute rounded-full  bg-white border-8 h-40 w-40 -bottom-20 -right-20 flex justify-center items-center"
      )}
    >
      <div
        className={classNames(
          active !== null ? `${colors[active]}` : "border-grey-300",
          "bg-white border-8 h-20 w-20 rounded-full"
        )}
      ></div>
    </div>
  );
}
