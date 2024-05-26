import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const UserInfo = () => {
  const { userId } = useSelector((state) => state.auth);
  const { friendInfo, friends } = useSelector((state) => state.friends);
  const ids = friends?.map((friend) => friend._id);
  const isFriend = ids?.includes(friendInfo._id);
  console.log(isFriend);
  function addFriendHandler() {
    navigation.navigate("AddFriend");
  }
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Thông tin",
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: friendInfo.avatar }}
          width={200}
          height={200}
          borderRadius={100}
        />
        <Text style={styles.name}>{friendInfo.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disabled={isFriend}
          title={isFriend ? "Đã là bạn" : "Kết bạn"}
          style={styles.addFriendButton}
          onPress={addFriendHandler}
        />
        <Button title={"Nhắn tin"} style={styles.addFriendButton} />
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:8
  },
  addFriendButton: {
    flex: 1,
    backgroundColor: "green",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 12,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name:{
    fontSize:24,
    fontWeight:"bold",
    marginTop:12
  }
});
