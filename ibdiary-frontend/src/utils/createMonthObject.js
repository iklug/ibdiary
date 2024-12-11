export default function createMonthObject(monthString) {
  console.log(monthString, "🥑");
  const splitDate = monthString.split("-");

  const newString = `${splitDate[0]}-${splitDate[1] - 1}-01`;
  console.log(newString, "🙂🙂🙂🙂🙂");
  return {
    month: splitDate[1] - 1,
    year: splitDate[0],
    day: 1,
    newString,
  };
}
