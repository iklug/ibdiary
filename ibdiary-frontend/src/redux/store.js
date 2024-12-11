import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import calendarReducer from "./calendarSlice";
import dateReducer from "./dateSlice";
import newEventReducer from "./newEventSlice";
import reflectionReducer from "./reflectionSlice";
import weekReducer from "./weekSlice";
import routeReducer from "./routeSlice";
import monthReducer from "./monthSlice";
export default configureStore({
  reducer: {
    profile: profileReducer,
    calendar: calendarReducer,
    date: dateReducer,
    newEvent: newEventReducer,
    reflection: reflectionReducer,
    week: weekReducer,
    route: routeReducer,
    month: monthReducer,
  },
});
