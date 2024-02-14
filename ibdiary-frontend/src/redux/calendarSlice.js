import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        value: [],
    },
    reducers: {
        addMonth: (state, action) => {
            state.value = [...state, action.payload]
        },
    }
});

export const {useMonth} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export default calendarSlice.reducer;