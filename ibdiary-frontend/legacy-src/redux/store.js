import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import calendarReducer from "./calendarSlice";
import dateReducer from "./dateSlice";
import newEventReducer from './newEventSlice';
import repeatEventReducer from './repeatEventSlice';

export default configureStore({
    reducer: {
        profile: profileReducer,
        calendar: calendarReducer,
        date: dateReducer,
        newEvent: newEventReducer,
        repeatEvents: repeatEventReducer,
    }
})