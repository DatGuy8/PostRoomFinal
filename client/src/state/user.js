import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
  name: "user",
  initialState: {
    mode: "light",
    user: null,
    token: null,
    friends: null,
    notifications: [],
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.friends = action.payload.friends
    },
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.friends = null;
      state.notifications = [];
    },
    setNotifications: (state,action) =>{
      state.notifications = action.payload.notifications;
    },
    setUpdateUser: (state,action)=>{
      state.user = action.payload.user;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setPost, setPosts, setFriends,setUpdateUser, setNotifications } =
  userSlice.actions;

export default userSlice.reducer;
