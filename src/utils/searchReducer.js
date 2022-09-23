import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: { text: "producten" },
  reducers: {
    searchTerm: (state, action) => {
      return { ...action.payload };
    },
  },
})

export const { searchTerm } = searchSlice.actions;

export default searchSlice.reducer;