const buildCalendar = (thisMonthDays, firstDay, lastMonthDays, nextMonthDays) => {
    
    const remainder = 35 - (thisMonthDays.length + firstDay);
    const previousMonthDays = lastMonthDays.slice(lastMonthDays.length - firstDay);
    const nextMonthDaysNumber = remainder >= 0 ? remainder : remainder + 7;  
    const nextMonthDaysSlice = nextMonthDays.slice(0, nextMonthDaysNumber)
    const arrayOfDays = [...previousMonthDays, ...thisMonthDays, ...nextMonthDaysSlice];
    return arrayOfDays;
}

export default buildCalendar;