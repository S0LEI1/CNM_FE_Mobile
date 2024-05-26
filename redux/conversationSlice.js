import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getConversationByIdAPI,
  getConversationByUserId,
  getMembersByConversationId,
} from "../utils/api/ConversationAPI";
export const fetchConversations = createAsyncThunk(
  "fetchConversations",
  async () => {
    try {
      const conversations = await getConversationByUserId();
      return conversations;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMembers = createAsyncThunk("fetchMembers", async(params)=>{
  try {
    const members = await getMembersByConversationId(params);
    console.log(members);
    return members;
  } catch (error) {
    console.log(error);
  }
})
export const fetchConversation = createAsyncThunk(
  "fetchConversation",
  async (params) => {
    try {
      const conversation = await getConversationByIdAPI(params);
      console.log("conversation", conversation);
      return conversation;
    } catch (error) {
      console.log(error);
    }
  }
);
const ConversationSlice = createSlice({
  name: "conversations",
  initialState: {
    listConversations: [],
    conversation: {},
    addMember: [],
    members: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    addListConversations:(state, action)=>{
      const conversation = action.payload
      const id = conversation.conversationId;
      const ids = state.listConversations.map((conversation) => conversation.conversationId);
      if(ids.includes(id)){
        return;
      }
      state.listConversations.push(action.payload);
    },
    addConversation: (state, action) => {
      state.conversation = action.payload;
    },
    addMemberToCreateGroup(state, action) {
      const params = action.payload;
      state.addMember.push(params);
    },
    removeMemberInCreateGroup(state, action) {
      const memberId = action.payload;
      const newMembers = state.addMember.filter(
        (member) => member._id !== memberId
      );
      state.addMember = [...newMembers];
    },
    refeshAddMember(state,action){
      state.addMember =[];
    },
    getMember(state, action){
      state.members = action.payload;
    },
    deleteMember(state, action){
      const memeberId = action.payload;
      const newMembers = state.members.filter((member) => member._id !== memeberId);
      state.members =[...newMembers];
    },
    addMember(state, action){
      const newMember = action.payload;
      state.members.push(newMember);
    },
    addDeputyLeader(state, action){
      const deputyId = action.payload;
      const deputyLeaderIds = state.conversation.deputyLeaderId;
      state.conversation.deputyLeaderId.push(deputyId);
    },
    deleteDeputyLeader(state, action){
      const deputyId = action.payload;
      const newDeputyLeaderIds =state.conversation.deputyLeaderId.filter((id) => id !== deputyId);
      state.conversation.deputyLeaderId = newDeputyLeaderIds;
    },
    removeConversation(state, action){
      const conversationId = action.payload;
      const newList = state.listConversations.filter(conversation => conversation._id !== conversationId);
      state.listConversations = newList;
    },
    updateLeader(state, action){
      const conversationId = action.payload;
      state.conversation.leaderId = conversationId;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listConversations = action.payload;
      // for (const con of conversations) {
      //   state.listConversations.push(con);
      // }
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // get conversation
    builder.addCase(fetchMembers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchConversation.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conversation = action.payload;
    });
    builder.addCase(fetchConversation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {
  addListConversations,
  addConversation,
  removeMemberInCreateGroup,
  addMemberToCreateGroup,
  refeshAddMember,
  getMember,
  addMember,
  deleteMember,
  addDeputyLeader,
  removeConversation,
  deleteDeputyLeader,
  updateLeader
} = ConversationSlice.actions;
export default ConversationSlice.reducer;
