import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendFileMessage,
  sendMessage,
} from "../../redux/MessageSlice";
import * as ImagePicker from "expo-image-picker";
import { sendFileMessageAPI, sendMessageAPI } from "../../utils/api/MessageAPI";
import openSocket from "socket.io-client";
import { PORT } from "../../utils/api/port";
const MessageInput = ({ conversationId }) => {
  const socket = openSocket(PORT);
  const conversationSelecter = useSelector((state) => state.conversations);
  const messageSelecter = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  function setContentHandler(enteredValue) {
    setContent(enteredValue);
  }
  async function sendMessageHandler() {
    // const params ={
    //   conversationId: conversationSelecter.conversation._id,
    //   content: content
    // }
    const message = await sendMessageAPI(conversationId, content);
    // socket.emit("message", {conversationId, message})
    setContent("");
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const params = {
        conversationId: conversationId,
        files: result.assets[0],
      };
      dispatch(sendFileMessage(params));
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Pressable style={styles.button}>
        <Ionicons name="happy-outline" size={24} />
      </Pressable> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tin nhắn"
          value={content}
          onChangeText={setContentHandler}
        />
      </View>
      <Pressable onPress={pickImageAsync} style={styles.button}>
        <Ionicons size={24} name="image-outline" />
      </Pressable>
      <Pressable
        disabled={content.length <= 0 ? true : false}
        onPress={sendMessageHandler}
        style={[styles.button, content.length <= 0 ? styles.disabled : styles.sendButton]}
      >
        <Ionicons size={24} name="send-outline" />
      </Pressable>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  inputContainer: {
    flex: 1,
    margin: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  input: {
    width: "100%",
    height: "100%",
  },
  button: {
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "cyan",
    height: "100%",
    padding: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled:{
    height: "100%",
    padding: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  }
});
