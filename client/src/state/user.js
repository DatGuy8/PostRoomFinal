import { createSlice } from "@reduxjs/toolkit";

export const userSlice =  createSlice({
  name: 'user',
  initialState:{
    mode: "light",
    user: null,
    token: null,
  },
  reducers:{
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
    }
  }
});

export const { setMode,setLogin, setLogout} = userSlice.actions;

export default userSlice.reducer;