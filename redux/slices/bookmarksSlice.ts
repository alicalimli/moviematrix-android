import { createSelector, createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      const newState = [...state.items, action.payload];
      state.items = newState;
    },
    removeBookmark: (state, action) => {
      const newItems = state.items.filter(
        (item) => +item.id !== +action.payload
      );

      state.items = newItems;
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export const getBookmarksState = (state) => state.bookmarks;

export default bookmarksSlice.reducer;
