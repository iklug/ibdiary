import classNames from "classnames";
export default function ReflectionButtons({ text, active, action }) {
  return (
    <div
      className={classNames(
        active === text ? "bg-green-100 text-green-800" : "bg-gray-100",
        "px-3 py-2 rounded-lg"
      )}
      onClick={action}
    >
      {text}
    </div>
  );
}
