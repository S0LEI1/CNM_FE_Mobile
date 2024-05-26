import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MessageOutput from "../components/Message/MessageOutput";
import MessageInput from "../components/Message/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  deleteMessage,
  fetchMessages,
} from "../redux/MessageSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { PORT } from "../utils/api/port";
import { getConversation } from "../redux/conversationSlice";
import { jwtDecode } from "jwt-decode";
import openSocket from "socket.io-client";
const ChatScreen = ({ route }) => {
  const conversationSelecter = useSelector((state) => state.conversations);
  const messageSelecter = useSelector((state) => state.messages);
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const chatName = conversationSelecter.conversation?.name;
  const navigation = useNavigation();
  const conversationIdFromRoute = route.params?.conversationId;
  const conversationId = conversationIdFromRoute
    ? conversationIdFromRoute
    : conversationSelecter.conversation?._id;
  const socket = openSocket(PORT);
  function leaveConversationHandler() {
    navigation.pop();
    socket.emit("leave-conversation", conversationId);
    socket.close();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: chatName,
      headerRight: (color, size) => (
        <View style={styles.headerRight}>
          {/* <Ionicons name="call-outline" size={24} color={color} />
          <Ionicons name="videocam-outline" size={24} /> */}
          <Ionicons name="menu" size={24} onPress={()=> navigation.navigate("OptionScreen")} />
        </View>
      ),
      headerLeft: (color) => (
        <Ionicons
          name="arrow-back"
          size={24}
          color={color}
          onPress={leaveConversationHandler}
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    async function fetchMessagesHandler() {
      if (messageSelecter.isLoading === true) {
        return <LoadingOverlay />;
      }
      if (conversationId !== undefined) {
        dispatch(fetchMessages(conversationId));
      }
    }
    fetchMessagesHandler();
  }, []);
  useEffect(() => {
    socket.on("message", (data) => {
      if (data.action === "create" && data.conversationId === conversationId)
        dispatch(addMessage(data?.message));
      if (data.action === "delete" && data.conversationId === conversationId)
        dispatch(deleteMessage(data?.message));
    });
    socket.on("share-message", (data)=>{
      if(data.action ==="create" && data.conversationId === conversationId){
        dispatch(fetchMessages(data.conversationId));
      }
    })

    socket.on("create-single-conversation", (data) => {
      if (data.action === "create") {
        dispatch(getConversation(data.conversation._id));
        dispatch(fetchMessages(data.conversation._id));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <MessageOutput
        listMessages={messageSelecter.listMessage}
        currentUserId={userSelector.userId}
      />
      <MessageInput conversationId={conversationId} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  inputContainer: {
    flex: 1,
  },
});
