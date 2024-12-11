import classNames from "classnames";
export default function ScaleButton({
  active,
  color,
  severity,
  action,
  text,
  font,
}) {
  return (
    <div
      className={classNames(
        active === severity
          ? `${color} ${
              font === "white" ? "text-gray-50" : "text-gray-800"
            } font-semibold`
          : "bg-gray-100",
        "p-2 h-12 w-24  rounded-lg flex justify-center items-center"
      )}
      onClick={() => action(severity)}
    >
      {text}
    </div>
  );
}
