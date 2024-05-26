import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import MessageModal from "../UI/MessageModal";
const MessageOutput = ({ listMessages, style, currentUserId }) => {
  const scrollRef = useRef();
  function renderMessage(itemData) {
    if(itemData.item.deletedUserIds.includes(currentUserId)){
      return;
    }
    return <MessageItem {...itemData.item} currentUserId={currentUserId} />;
  }
  return (
      <FlatList
        data={listMessages}
        key={(item) => item._id}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
        renderItem={renderMessage}
      />
  );
};

export default MessageOutput;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    height: "100%",
    backgroundColor: "#E6E6E6",
  },
});
