import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        months: [],
        value: {
          },
    },
    reducers: {
        addMonth: (state, action) => {
            state.value = [...state, action.payload]
        },
        addDay: (state, action) => {
            state.value = {...state.value, ...action.payload};
        },
        addBulk: (state,action) => {
            state.value = {...state.value, ...action.payload};
        },
        deleteDay: (state,action) => {
            delete state.value[action.payload];
        },
        trackMonth: (state,action) => {
            state.months.push(action.payload);
        },
        removeEvent: (state,action) => {
            // state.value[action.payload.date].events.filter(event => event.id !== action.payload.id);
            
            // state.value[action.payload.date].events.filter(event => event._id !== action.payload.id);
            state.value[action.payload.date].events = state.value[action.payload.date].events.filter(event => event._id !== action.payload.id);
        },
        replaceState: (state, action) => {
            state.months = [];
            state.value = {};
        }
    }
});

export const {addMonth, addDay, addBulk, deleteDay, trackMonth, removeEvent, replaceState} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export const selectDay = day => (state) => state.value[day];
export const selectMonths = (state) => state.calendar.months;
export const selectAmountOfEvents = day => (state) => state.value[day].events.length;
export default calendarSlice.reducer;