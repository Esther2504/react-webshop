import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: { text: "" },
  reducers: {
    searchTerm: (state, action) => {
      return { ...action.payload };
    },
  },
})

export const { searchTerm } = searchSlice.actions;

export default searchSlice.reducer;