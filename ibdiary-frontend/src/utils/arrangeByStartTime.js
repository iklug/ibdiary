

const arrangeByStartTime = (todaysEvents) => {
    let sortedEvents = false;
    if(todaysEvents !== null){
        sortedEvents = [...todaysEvents.events].sort((a,b)=>{
            const eventA = a.startTime || '24';
            const eventB = b.startTime || '24';
            return eventA.localeCompare(eventB)})
    }
    return sortedEvents;
    
}

export default arrangeByStartTime;