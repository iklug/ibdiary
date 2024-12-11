
const findFirstDay = (year, month) => {
     const firstDay = new Date(year, month, 1);
     return firstDay.getDay();
}

export default findFirstDay;