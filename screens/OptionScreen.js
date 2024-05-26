import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../components/Options/Info";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import GroupOption from "../components/Options/Group/GroupOption";
import openSocket from "socket.io-client";
import {
  deleteGroupConversationAPI,
  deleteMessagesByConversationIdAPI,
  getMembersByConversationId,
  leaveGroupAPI,
} from "../utils/api/ConversationAPI";
import { deleteAllMessage } from "../redux/MessageSlice";
import {
  deleteMember,
  fetchConversations,
  fetchMembers,
  getMember,
  removeConversation,
} from "../redux/conversationSlice";
import { PORT } from "../utils/api/port";

const OptionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tùy chọn",
    });
  }, []);
  const socket = openSocket(PORT);
  const { conversation } = useSelector((state) => state.conversations);
  const { userId } = useSelector((state) => state.auth);
  async function deleteMessagesHandler() {
    dispatch(deleteAllMessage());
    await deleteMessagesByConversationIdAPI(conversation._id);
    navigation.goBack();
  }
  async function getMembersByConversationIdHandler() {
    const members = await getMembersByConversationId(conversation._id);
    dispatch(getMember(members));
    navigation.navigate("MemberScreen");
  }
  async function deleteGroupHandler() {
    dispatch(removeConversation(conversation._id));
    await deleteGroupConversationAPI(conversation._id);
    navigation.navigate("Home", { screen: "Tin nhắn" });
  }
  async function leaderGroupHandler() {
    if (userId === conversation.leaderId) {
      Alert.alert(
        "Nhóm trưởng",
        "Cần phải chuyển chức lại cho một thành viên khác",
        [
          {
            text: "Cancel",
          },
          {
            text: "Ok",
            onPress: () => {
              dispatch(fetchMembers(conversation._id));
              navigation.navigate("MemberScreen");
            },
          },
        ]
      );
    } else {
      await leaveGroupAPI(conversation._id);
      dispatch(deleteMember(userId));
      dispatch(fetchConversations());
      navigation.navigate("Home", { screen: "Tin nhắn" });
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Info {...conversation} />
      {conversation.type === "GROUP" ? (
        <View>
          <IconButton
            icon={"person-add-outline"}
            color={"#000"}
            title={"Thêm thành viên"}
            size={24}
            style={styles.deleteButton}
            textStyle={styles.text}
            // onPress={getMembersByConversationIdHandler}
          />
          <IconButton
            icon={"people-outline"}
            color={"#000"}
            title={"Xem thành viên"}
            size={24}
            style={styles.deleteButton}
            textStyle={styles.text}
            onPress={getMembersByConversationIdHandler}
          />
        </View>
      ) : (
        <IconButton
          icon={"person-add-outline"}
          color={"#000"}
          title={"Thêm vào nhóm"}
          size={24}
          style={styles.deleteButton}
          textStyle={styles.text}
        />
      )}
      <IconButton
        icon={"trash-outline"}
        color={"#FF0000"}
        title={"Xoá tin nhắn"}
        size={24}
        style={styles.deleteButton}
        textStyle={styles.text}
        onPress={deleteMessagesHandler}
      />
      {conversation.type === "GROUP" && (
        <GroupOption
          userId={userId}
          leaderId={conversation.leaderId}
          onDeleteGroup={deleteGroupHandler}
          onLeaveGroup={leaderGroupHandler}
        />
      )}
    </ScrollView>
  );
};

export default OptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  deleteButton: {
    marginTop: 12,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 12,
  },
});
