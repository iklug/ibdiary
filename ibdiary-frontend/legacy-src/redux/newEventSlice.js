import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    title: null,
    type: 'event',
    date: new Date(),
    startTime: null,
    endTime: null,
    repeat: null,
    open: false,
}

export const newEventSlice = createSlice({
    name: 'newEvent',
    initialState: {
        value: {
            title: '',
            type: 'event',
            date: new Date().toDateString(),
            startTime: null,
            endTime: null,
            repeat: null,
        },
        isOpen: false,
     },
    reducers: {
        clearEvent: (state) => {
            state.value = initialState;
        },
        updateTitle: (state, action) => {
            state.value.title = action.payload;
        },
        updateType: (state, action) => {
            state.value.type = action.payload;
        },
        updateDate: (state, action) => {
            state.value.date = action.payload;
        },
        updateStart: (state, action) => {
            state.value.startTime = action.payload;
        },
        updateEnd: (state, action) => {
            state.value.endTime = action.payload;
        },
        updateRepeat: (state, action) => {
            state.value.repeat = action.payload;
        },
        openNewEvent: (state) => {
            state.isOpen = true;
        },
        closeNewEvent: (state) => {
            state.isOpen = false;
        }
    },
}
);

export const {updateDate, updateEnd, updateRepeat, updateType, updateTitle, updateStart, openNewEvent, closeNewEvent, clearEvent} = newEventSlice.actions;
export const selectNewEvent = (state) => state.newEvent.value;
export const newEventIsOpen = (state) => state.newEvent.isOpen;
export default newEventSlice.reducer;