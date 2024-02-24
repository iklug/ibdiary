import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
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
            state.value = action.payload;
        }
    }
});

export const {addMonth, addDay, addBulk} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export const selectDay = day => (state) => state.value[day];
export default calendarSlice.reducer;