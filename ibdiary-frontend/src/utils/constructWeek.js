import { format, parseISO } from "date-fns";

const constructWeek = (date, day) => {
  const originalDate = parseISO(date);
  console.log("original Date", originalDate);
  let before = day;
  let after = 7 - day;

  let daysBefore = [];
  let daysAfter = [];

  for (let i = before; i > 0; i--) {
    let newDate = new Date(originalDate);

    newDate.setDate(originalDate.getDate() - i);
    console.log("newDate", newDate);
    daysBefore.push(format(newDate, "yyyy-MM-dd"));
  }
  for (let i = 1; i < after; i++) {
    let newDate = new Date(originalDate);
    newDate.setDate(originalDate.getDate() + i);

    daysAfter.push(format(newDate, "yyyy-MM-dd"));
  }
  const dateArray = [...daysBefore, date, ...daysAfter];
  console.log("array of dates in here", dateArray);
  return dateArray;
};

export default constructWeek;
