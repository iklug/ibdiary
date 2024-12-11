
const arrayOfDaysInMonth = (year, month) => {
   if(month === -1){
      year-=1;
      month=11;
   }
   if(month === 12){
      year+=1;
      month=0;
   } 
   
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

   
    const totalDayArray = [...Array(totalDays).keys()].map(i => {
      let day;
      if(i < 9){
         day = `0` + (i+1);
      }
      else {
         day = i+1;
      }
      let twoDigitMonth;
      if(month > 8){
         twoDigitMonth = month + 1;
      } else {
         twoDigitMonth = `0${month+1}`;
      }
      return  {year,month, twoDigitMonth ,twoDigitDay: day, day: i+1};
    });
 
    return totalDayArray;
}

export default arrayOfDaysInMonth;