import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FriendRequestOutput from "../components/Friend/FriendRequestOutput";
import ListFriend from "../components/Friend/ListFriend";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getFriendReqs, getFriends } from "../redux/FriendSlice";
import { PORT } from "../utils/api/port";
import { getFriendsAPI } from "../utils/api/FriendAPI";
const FriendScreen = ({navigation}) => {
  const friendSelector = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getFriendReqsHandler() {
      dispatch(getFriendReqs());
    }
    async function getFriendsHandler() {
      dispatch(getFriends());
    }
    getFriendsHandler();
    getFriendReqsHandler();
  }, [navigation]);
  const socket = openSocket(PORT);
  useEffect(() => {
    socket.on("addFriend", (data) => {
      if (data.action === "create") {
        dispatch(getFriendReqs());
      }
    });
  }, [socket]);
  return (
    <View style={styles.container}>
      <FriendRequestOutput listRequest={friendSelector?.friendReqs} />
      <ListFriend friends={friendSelector?.friends} />
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 12,
    backgroundColor: "white",
  },
});
