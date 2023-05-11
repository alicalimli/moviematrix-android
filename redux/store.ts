import { configureStore } from "@reduxjs/toolkit";
import bookmarksSlice from "./slices/bookmarksSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
