import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accpetAddFriend } from "../../utils/api/FriendAPI";

const FriendRequestOutput = ({ listRequest }) => {
  function renderRequest(itemData) {
    const item = itemData.item;
    console.log(item);
    return (
      <FriendRequestItem
        {...item}
      />
    );
  }
  if (listRequest.length <= 0) {
    return (
      <View>
        <Text style={styles.title}>Lời mời kết bạn</Text>
        <Text>Không có lời mời kết bạn</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.title}>Lời mời kết bạn</Text>
      <FlatList
        data={listRequest}
        keyExtractor={(item) => item._id}
        renderItem={renderRequest}
      />
    </View>
  );
};

export default FriendRequestOutput;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
