import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

// Initialize the Socket.io connection
const socket = io.connect("http://localhost:8080");

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
            state.friends = action.payload.friends;
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
        setNotifications: (state, action) => {
            state.notifications = action.payload.notifications;
        },
        setUpdateUser: (state, action) => {
            state.user = action.payload.user;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                    return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        emitNotification: (state, action) => {
            const { targetUserName } = action.payload;

            socket.emit("newNotification", targetUserName);
            // console.log("emitting" ,notification);
        },
    },
});

export const {
    setMode,
    setLogin,
    setLogout,
    setPost,
    setPosts,
    setFriends,
    setUpdateUser,
    setNotifications,
    emitNotification,
} = userSlice.actions;

export default userSlice.reducer;
