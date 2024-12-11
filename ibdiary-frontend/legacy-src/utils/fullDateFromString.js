
const fullDateFromString = (date) => {
    
   const splitDate = date.split('-');

    const monthObj = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    }

    return `${monthObj[splitDate[1]]} ${splitDate[2]}, ${splitDate[0]}`

}

export default fullDateFromString;