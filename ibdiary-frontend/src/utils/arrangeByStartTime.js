

const arrangeByStartTime = (todaysEvents) => {
    console.log('inarranging: ', todaysEvents);
    // let sortedEvents = false;
    // if(todaysEvents !== null){
        try {
            const sortedEvents = todaysEvents.events.sort((a,b)=>{
                const eventA = a.startTime || '24';
                const eventB = b.startTime || '24';
                return eventA.localeCompare(eventB)})
            
        
            return sortedEvents;
            
        } catch (error) {
            console.error(error);
            return null;
        }
}

export default arrangeByStartTime;