import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    updateUser: (state, action) => {
      return { ...action.payload };
    },
    signOutUser: (state) => {
      return [];
    }
  },
})

export const { updateUser, signOutUser } = loginSlice.actions;

export default loginSlice.reducer;