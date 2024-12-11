import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.value = action.payload;
        },
        removeUser: (state) => {
            state.value = null;
        }
    }
});

export const {getUser, removeUser} = profileSlice.actions;
export const selectUser = (state) => state.profile.value;
export default profileSlice.reducer;