import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendMessageAPI,
  fe,
  getListMessageAPI,
  fetchMessagesAPI,
  sendFileMessageAPI,
} from "../utils/api/MessageAPI";
export const sendFileMessage = createAsyncThunk(
  "sendFileMessage",
  async (params) => {
    try {
      const { conversationId, files } = params;
      const message = await sendFileMessageAPI(conversationId, files);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMessages = createAsyncThunk(
  "fetchMessages",
  async (params) => {
    try {
      const listMessages = await fetchMessagesAPI(params);
      return listMessages;
    } catch (error) {
      console.log(error);
    }
  }
);
const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    listMessage: [],
    selectedMessage: {},
    isLoading: false,
    isError: false,
    shareConversation: [],
    shareMessage: {},
  },
  reducers: {
    addMessage: (state, action) => {
      state.listMessage.push(action.payload);
    },

    deleteMessageOnlyMe: (state, action) => {
      const messageId = action.payload;
      const newList = state.listMessage.filter(
        (message) => message._id !== messageId
      );
      state.listMessage = newList;
    },
    deleteMessage: (state, action) => {
      const message = action.payload;
      const messageId = message._id;
      const newMessages = state.listMessage;
      const messageDeleteIndex = newMessages.findIndex(
        (message) => message._id === messageId
      );
      newMessages[messageDeleteIndex] = message;
      state.listMessage = newMessages;
    },
    addShareCovnersation(state, action) {
      const params = action.payload;
      state.shareConversation.push(params);
    },
    removeShareConversation(state, action) {
      const conversationId = action.payload;
      const newShareConversation = state.shareConversation.filter(
        (conversation) => conversation._id !== conversationId
      );
      state.shareConversation = [...newShareConversation];
    },
    getShareMessage(state, action) {
      const messageId = action.payload;
      const messageIndex = state.listMessage.findIndex(
        (message) => message._id.toString() === messageId.toString()
      );
      const findMessage = state.listMessage[messageIndex];
      state.shareMessage = findMessage;
    },
    resetShare(state, action) {
      state.shareConversation = [];
      state.shareMessage = {};
    },
    deleteAllMessage(state, action){
      state.listMessage = [];
    }
  },
  extraReducers: (builder) => {
    // get list
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listMessage = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {
  addMessage,
  deleteMessage,
  deleteMessageOnlyMe,
  addShareCovnersation,
  removeShareConversation,
  getShareMessage,
  resetShare,
  deleteAllMessage
} = MessageSlice.actions;
export default MessageSlice.reducer;
