
const repeatEvent = (event, date, allRepeatEvents={}) => {
    
    const startDate = new Date(`${date}T00:00:00`);
    const dateCollection = [startDate];
    const repeatNum = event.repeat;

    for(let i = 0; i<10; i++){
        const nextDate = new Date(dateCollection[i]);
        nextDate.setDate(nextDate.getDate() + (repeatNum * 7));
        dateCollection.push(nextDate)
    }

    const dateStrings = dateCollection.map(item => `${item.getFullYear()}-${(item.getMonth() + 1) < 10 ? `0${item.getMonth() + 1}` : item.getMonth() + 1}-${item.getDate() < 10 ? `0${item.getDate()}` : item.getDate()}`);
    const repeatEventObject = dateStrings.reduce((acc,item)=>{
        acc[item] = [event];
        return acc;
    }, {});

    console.log('repeatObject', repeatEventObject);
    const combinedEvents = {};

  for(const date in allRepeatEvents){
    if(date in repeatEventObject){
      combinedEvents[date] = [...allRepeatEvents[date], ...repeatEventObject[date]];
    } else {
      combinedEvents[date] = allRepeatEvents[date];
    }
  }

  for(const date in repeatEventObject){
    if(!(date in allRepeatEvents)){

      combinedEvents[date] = repeatEventObject[date];
    }
  }
  return(combinedEvents);
}

export default repeatEvent;