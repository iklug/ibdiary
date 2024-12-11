import { format, parseISO, getDaysInMonth } from "date-fns";

const constructMonth = (year, month) => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const monthArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    let newDay = new Date(year, month, i);
    let formatDate = format(newDay, "yyyy-MM-dd");
    monthArray.push(formatDate);
  }
  return monthArray;
};

export default constructMonth;
