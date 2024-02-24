
const reformatDayObject = (day) => {
    const date = day.date;
    return {
        [date]: day
    }
};

export default reformatDayObject;