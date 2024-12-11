import { createSlice } from "@reduxjs/toolkit";

export const reflectionSlice = createSlice({
  name: "reflection",
  initialState: {
    value: {
      date: "",
      view: "Reflection",
      editing: true,
      entry: "",
      stress: null,
      symptoms: null,
    },
  },
  reducers: {
    getReflection: (state, action) => {
      state.value = action.payload;
    },
    changeView: (state, action) => {
      state.value.view = action.payload;
    },

    addEntry: (state, action) => {
      state.value.entry = action.payload;
    },

    addStress: (state, action) => {
      state.value.stress = action.payload;
    },
    addSymptoms: (state, action) => {
      state.value.symptoms = action.payload;
    },

    exitReflection: (state) => {
      state.value = null;
    },
  },
});

export const {
  getReflection,
  exitReflection,
  changeView,
  addStress,
  addEntry,
  addSymptoms,
} = reflectionSlice.actions;
export const selectReflection = (state) => state.reflection.value;
export const selectStressScale = (state) => state.reflection.value.stress;
export const selectSymptomScale = (state) => state.reflection.value.symptoms;
export default reflectionSlice.reducer;
