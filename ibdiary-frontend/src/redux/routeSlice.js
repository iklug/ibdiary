import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
  name: "route",
  initialState: {
    value: "calendar",
  },
  reducers: {
    changeRoute: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeRoute } = routeSlice.actions;
export const selectRoute = (state) => state.route.value;
export default routeSlice.reducer;
