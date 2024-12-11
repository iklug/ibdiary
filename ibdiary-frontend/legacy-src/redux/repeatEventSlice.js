import {createSlice} from '@reduxjs/toolkit';

export const repeatEventSlice = createSlice({
    name: 'repeatEvents',
    initialState: {
        value: {},
    },
    reducers: {
        addRepeatEvent: (state, action) => {
            state.value = action.payload;
        },
        removeRepeatEvent: (state) => {
            state.value = null;
        },
    }
});

export const {addRepeatEvent, removeRepeatEvent} = repeatEventSlice.actions;
export const selectRepeatEvents = (state) => state.repeatEvents.value;
export default repeatEventSlice.reducer;