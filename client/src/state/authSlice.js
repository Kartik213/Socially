import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // these are basically functions used to manipulate the state
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("Login to see friends");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // update a post
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
