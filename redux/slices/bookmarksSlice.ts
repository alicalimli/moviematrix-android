import { createSelector, createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarkedIds: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkedIds.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkedIds = state.bookmarkedIds.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export const getBookmarksState = (state) => state.bookmarks;

export default bookmarksSlice.reducer;
