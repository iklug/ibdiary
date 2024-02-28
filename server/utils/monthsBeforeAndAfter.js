
const monthAndYearBefore = (year, month) => {

    const monthArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let index = monthArray.indexOf(month);
    let previousMonth = month === '01' ? monthArray[11] : monthArray[index - 1];
    let yearNumber = Number(year);
    if(month === '01'){
        yearNumber--;
    }

    return (`^${yearNumber}-${previousMonth}-`);

}

const monthAndYearAfter = (year, month) => {
    
    const monthArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let index = monthArray.indexOf(month);
    let nextMonth = month === '12' ? monthArray[0] : monthArray[index + 1];
    let yearNumber = Number(year);
    if(month === '12'){
        yearNumber++;
    }

    return (`^${yearNumber}-${nextMonth}-`);
}

module.exports.monthAndYearBefore = monthAndYearBefore;
module.exports.monthAndYearAfter = monthAndYearAfter;