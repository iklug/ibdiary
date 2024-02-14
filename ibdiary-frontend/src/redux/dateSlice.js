import {createSlice} from '@reduxjs/toolkit';

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: {
            today: null,
            viewing: null,
        },
    },
    reducers: {
        addToday: (state, action) => {
            state.value.today = action.payload;
        },
        addViewing: (state,action) => {
            state.value.viewing = action.payload;
        },
        incrementMonth: (state) => {
            state.value.viewing.month === 11 ? state.value.viewing.month = 0 :
            state.value.viewing.month++;
        },
        decrementMonth: (state) => {
            state.value.viewing.month === 0 ? state.value.viewing.month = 11 :
            state.value.viewing.month--;
        },
        incrementYear: (state) => {
            state.value.viewing.year++;
        },
        decrementYear: (state) => {
            state.value.viewing.year--;
        },
    }
});

export const {addToday, addViewing, incrementMonth, decrementMonth, incrementYear, decrementYear} = dateSlice.actions;
export const selectToday = (state) => state.date.value.today;
export const selectView = (state) => state.date.value.viewing;
export default dateSlice.reducer;