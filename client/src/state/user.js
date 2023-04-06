import { createSlice } from "@reduxjs/toolkit";

export const userSlice =  createSlice({
  name: 'user',
  initialState:{
    lightMode: "light",
    user: null,
    token: null,
  },
  reducers:{
    setLightMode: (state) => {
      state.lightMode = state.lightMode === "light" ? "dark" : "light";
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

export const { setLightMode,setLogin, setLogout} = userSlice.actions;

export default userSlice.reducer;