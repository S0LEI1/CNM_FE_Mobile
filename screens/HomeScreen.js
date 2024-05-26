import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ConversationOutput from "../components/Conversation/ConversationOutput";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  removeConversation,
} from "../redux/conversationSlice";
import ModalUI from "../components/UI/Modal";

import openSocket from "socket.io-client";
import { PORT } from "../utils/api/port";
import { getFriendReqs, getFriends } from "../redux/FriendSlice";
import { getUser } from "../redux/authSlice";
import { addMessage, resetShare } from "../redux/MessageSlice";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const conversationsSelector = useSelector((state) => state.conversations);
  const userSelector = useSelector((state) => state.auth);
  const currentUserId = userSelector.userId;
  const conversations = conversationsSelector.listConversations;
  const dispatch = useDispatch();
  const socket = openSocket(PORT);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text>Tin nhắn</Text>,
      headerRight: (color, size) => (
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.headerRight}
        >
          <Ionicons name="add" size={24} />
        </Pressable>
      ),
    });
  }, []);
  useLayoutEffect(() => {
    async function fetchConversationHandler() {
      dispatch(fetchConversations());
      dispatch(getUser());
      dispatch(getFriends());
      dispatch(getFriendReqs());
    }
    fetchConversationHandler();
  }, []);

  useEffect(() => {
    if (!conversations) return;

    const conversationIds = conversations.map(
      (conversationEle) => conversationEle.conversationId
    );

    socket.emit("join-conversations", conversationIds);
    socket.emit("join", currentUserId);
  }, [conversations]);

  useLayoutEffect(() => {
    socket.on("create-single-conversation", (data) => {
      if (data.action === "create") {
        dispatch(fetchConversations());
        dispatch(getFriends())
        dispatch(getFriendReqs());
      }
    });
    socket.on("create-group-conversation", (data) => {
      if (
        data.action === "create" &&
        data.group.member._id.toString() === currentUserId.toString()
      ) {
        dispatch(fetchConversations());
      }
    });
  }, []);
  useEffect(() => {
    socket.on("create-group-conversation", (data) => {
      if (
        data.action === "create" &&
        data.group.member._id.toString() === currentUserId.toString()
      ) {
        dispatch(fetchConversations());
      }
    });
    socket.on("delete-group", (data) => {
      dispatch(fetchConversations());
    });
  }, [socket]);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(resetShare());
  }, [isFocused]);
  function addFriendHandler() {
    navigation.navigate("FindFriend");
    setModalVisible(false);
  }
  function createGroupHandler() {
    navigation.navigate("CreateGroup");
    setModalVisible(false);
  }
  function renderModal() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.button} onPress={addFriendHandler}>
                <Ionicons name="person-add-outline" size={16} />
                <Text>Thêm bạn bè</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={createGroupHandler}>
                <Ionicons name="people-outline" size={16} />
                <Text>Tạo nhóm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ConversationOutput
        listConversations={conversations}
        currentUserId={userSelector.userId}
      />
      {renderModal()}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 8,
  },
  centeredView: {
    flex: 1,
    marginTop: 12,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    position: "absolute",
    right: 0,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
});
