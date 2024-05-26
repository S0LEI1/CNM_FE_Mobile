import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accpetAddFriendAPI, addFriendAPI, findFriendByPhone, getFriendsAPI, getListFriendRequest } from "../utils/api/FriendAPI";

export const getFriendByPhoneNumber = createAsyncThunk(
  "getFriendByPhoneNumber",
  async (params) => {
    try {
      const friend = await findFriendByPhone(params);
      return friend;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFriend = createAsyncThunk("addFriend", async (params) => {
  const { id, content } = params;
  try {
    const addFriend = await addFriendAPI(id, content);
    return addFriend;
  } catch (error) {
    console.log(error);
  }
});

export const getFriendReqs = createAsyncThunk("getFriendReqs", async() =>{
  try {
    const friendReqs = await getListFriendRequest();
    return friendReqs;
  } catch (error) {
    console.log(error);
  }
})

export const accpetAddFriend = createAsyncThunk("accpetAddFriend", async(params) =>{
  try {
    await accpetAddFriendAPI(params);
  } catch (error) {
    console.log(error);
  }
})
export const getFriends = createAsyncThunk("getFriends", async() =>{
  try {
    const friends = await getFriendsAPI();
    return friends;
  } catch (error) {
    console.log(error);
  }
})
const FriendSlice = createSlice({
  name: "friends",
  initialState: {
    friends:[],
    friendInfo: {},
    friendReqs: [],
    isLoading: false,
    isError: false,
  },
  reducers:{
    addFriendReq(state, action){
      const req = action.payload;
      state.friendReqs.push(req);
    },
    findFriend(state,action){
      const friend = action.payload;
      state.friendInfo = friend;
    }
  },
  extraReducers: (builder) => {
    // find friend
    builder.addCase(getFriendByPhoneNumber.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFriendByPhoneNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friendInfo = action.payload;
    });
    builder.addCase(getFriendByPhoneNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // add friend
    builder.addCase(addFriend.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friendReqs.push(action.payload);
    });
    builder.addCase(addFriend.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // list request
    builder.addCase(getFriendReqs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFriendReqs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friendReqs = action.payload;
    });
    builder.addCase(getFriendReqs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });


    // accpet add friend
    builder.addCase(accpetAddFriend.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(accpetAddFriend.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(accpetAddFriend.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get friends

    builder.addCase(getFriends.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {addFriendReq, findFriend} = FriendSlice.actions;
export default FriendSlice.reducer;
