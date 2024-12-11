export default function CalendarContainer({ children }) {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 flex-grow-0">
      {children}
    </div>
  );
}
