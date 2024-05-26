import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ConversationItem from "./ConversationItem";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getConversationById,
  getConversationByIdAPI,
} from "../../utils/api/ConversationAPI";
import { useDispatch, useSelector } from "react-redux";
import { addConversation, getConversation } from "../../redux/conversationSlice";
import LoadingOverlay from "../UI/LoadingOverlay";
import openSocket from "socket.io-client";
import { PORT } from "../../utils/api/port";
const ConversationOutput = ({ listConversations, onPress }) => {
  const navigation = useNavigation();
  const conversations = useSelector((state) => state.conversations);
  const userSelector = useSelector((state) => state.auth);
  const currentUserId = userSelector.userId;
  const dispatch = useDispatch();
  const socket = openSocket(PORT);
  async function getConversationHandler(conversationId) {
    const conversation = await getConversationByIdAPI(conversationId);
    dispatch(addConversation(conversation));
    // if (conversations.isLoading === true) {
    //   return <LoadingOverlay />;
    // }
    // if (conversations.isLoading === false && conversations.isError === true) {
    //   Alert.alert("Erorr", "Could not get conversation");
    //   return;
    // }

    socket.emit("join-conversation", conversationId);

    navigation.navigate("Chat", { conversationId: conversationId });
  }

  function renderConversation(itemData) {
    const item = itemData.item;
    return (
      <ConversationItem
        name={item.name}
        avatar={itemData.item.avatar}
        lastMessage={item.lastMessage?.content}
        onPress={getConversationHandler.bind(this, item.conversationId)}
      />
    );
  }
  return (
    <FlatList
      data={listConversations}
      keyExtractor={(item) => item.conversationId}
      renderItem={renderConversation}
    />
  );
};

export default ConversationOutput;

const styles = StyleSheet.create({});
