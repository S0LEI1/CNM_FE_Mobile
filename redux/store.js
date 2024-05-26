import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './authSlice'
import ConversationReducer from "./conversationSlice";
import FriendReducer from "./FriendSlice"
import MessageReducer from './MessageSlice'
export const store = configureStore({
    reducer:{
        auth: AuthReducer,
        conversations: ConversationReducer,
        friends: FriendReducer,
        messages: MessageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})