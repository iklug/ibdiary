
const DayView = () => {
    
//create a background of hours.. i don't know how it's decided what goes where though?
//have a thing at the top that collects events without times
//to the right place the reflection (probably whether there is one or not..)
//


    return (
        <div className="h-full w-full">
            <div id='dayBanner'></div>
            <div id="hourlessEvents"></div>
            <div id="container">
                <div id="scrollBox"></div>
                    
                <div id="reflectionBox">
                    <div id="reflection"></div>
                </div>
            </div>

        </div>
    )
}

export default Day;