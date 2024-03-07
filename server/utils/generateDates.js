
const printDates = (number, date) => {
    const start = new Date(`${date}T00:00:00`);
    const dateCollection = [start];
  
    for(let i=0; i<30; i++){
      const next = new Date(dateCollection[i]);
      next.setDate(next.getDate() + (number * 7));
      dateCollection.push(next);
    }
    const convertToStrings = dateCollection.map(item => `${item.getFullYear()}-${(item.getMonth() + 1) < 10 ? `0${item.getMonth() + 1}` : item.getMonth() + 1}-${item.getDate() < 10 ? `0${item.getDate()}` : item.getDate()}`);
    return convertToStrings;
  };

module.exports = printDates;