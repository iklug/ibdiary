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
    }
});

export const {addMonth, addDay, addBulk, deleteDay, trackMonth} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export const selectDay = day => (state) => state.value[day];
export const selectMonths = (state) => state.calendar.months;
export default calendarSlice.reducer;