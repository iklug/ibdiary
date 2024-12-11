import { createSlice } from "@reduxjs/toolkit";

export const monthSlice = createSlice({
  name: "month",
  initialState: {
    value: {
      month: null,
      year: null,
    },
  },
  reducers: {
    addMonth: (state, action) => {
      state.value = action.payload;
    },

    incrementMonth: (state, action) => {
      state.value = action.payload;
    },

    decrementMonth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addMonth, incrementMonth, decrementMonth } = monthSlice.actions;
export const selectMonth = (state) => state.month.value;
export default monthSlice.reducer;
