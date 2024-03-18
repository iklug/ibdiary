

const arrangeByStartTime = (todaysEvents) => {

    const modifyArray = todaysEvents; 
        try {
            const sortedEvents = modifyArray.sort((a,b)=>{
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