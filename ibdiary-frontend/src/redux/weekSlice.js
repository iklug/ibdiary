import { createSlice } from "@reduxjs/toolkit";

export const weekSlice = createSlice({
  name: "week",
  initialState: {
    value: [],
  },
  reducers: {
    addWeeks: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addWeeks } = weekSlice.actions;
export const selectWeeks = (state) => state.week.value;
export default weekSlice.reducer;
