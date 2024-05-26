import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserByIdAPI, login, loginAPI } from "../utils/api/LoginAPI";
export const loginHandler = createAsyncThunk("loginHandler", async (params) => {
  const { phoneNumber, password } = params;
  const token = await loginAPI(phoneNumber, password).then((token) =>
    AsyncStorage.setItem("token", token)
  );
  //   console.log(tok
  return token;
});
export const logout = createAsyncThunk("logout", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
});
export const getUser = createAsyncThunk("getUser", async() =>{
  try {
    const user = await getUserByIdAPI();
    return user;
  } catch (error) {
    console.log(error);
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    userId:"",
    isLoading: false,
    isError: false,
  },
  reducers:{
    addToken: (state, action) =>{
      const {token, userId} = action.payload;
      state.token = token;
      state.userId = userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginHandler.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginHandler.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(loginHandler.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // getUser
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userId = action.payload._id;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {addToken} = authSlice.actions;
export default authSlice.reducer;
