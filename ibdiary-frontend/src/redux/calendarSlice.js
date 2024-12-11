import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    active: "",
    value: {},
  },
  reducers: {
    addData: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    addActive: (state, action) => {
      state.active = action.payload;
    },
    changeView: (state, action) => {
      state.value[state.active].view = action.payload;
    },
    addStress: (state, action) => {
      state.value[state.active].stress = action.payload;
    },
    addSymptoms: (state, action) => {
      state.value[state.active].symptoms = action.payload;
    },
    addEntry: (state, action) => {
      state.value[state.active].entry = action.payload;
    },
    defaultView: (state, action) => {
      state.value[state.active].view = "Reflection";
    },
    changeEdit: (state, action) => {
      state.value[state.active].edit = action.payload;
    },
  },
});

export const {
  addData,
  addActive,
  addStress,
  changeView,
  addSymptoms,
  addEntry,
  defaultView,
  changeEdit,
} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export const selectActive = (state) => state.calendar.active;
export const selectViewing = (state) =>
  state.calendar.value[state.calendar.active];
export default calendarSlice.reducer;
