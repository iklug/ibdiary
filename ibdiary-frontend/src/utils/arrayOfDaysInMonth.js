
const arrayOfDaysInMonth = (year, month) => {
    let totalDays;
     if(month === 1){
        year % 4 === 0 ? totalDays = 29 : totalDays = 28;
     }
     else if(month === 8 || month === 10 || month === 3 || month === 5){
        totalDays = 30;
     }
     else{
        totalDays = 31;
     }

    const totalDayArray = [...Array(totalDays).keys()].map(i => {return {year,month,day: i+1}});
 
    return totalDayArray;
}

export default arrayOfDaysInMonth;