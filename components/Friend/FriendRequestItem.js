import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { accpetAddFriend } from "../../redux/FriendSlice";
import IconButton from "../UI/IconButton";

const FriendRequestItem = ({ _id, name, sender, content }) => {
  const navigation = useNavigation();
  const friendSelector = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  async function acceptAddFriendHandler() {
    try {
      dispatch(accpetAddFriend(_id));
      if (friendSelector.isLoading === false && friendSelector.isError === false)
        navigation.navigate("Home", {screen: "Tin nhắn"});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: sender.avatar }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text>{content}</Text>
        </View>
      </View>
      <IconButton textStyle={styles.text} style={styles.button} title="Chấp nhận" onPress={acceptAddFriendHandler} />
    </View>
  );
};

export default FriendRequestItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
    borderBottomWidth:1,
    paddingBottom:24
  },
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    marginHorizontal: 8,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button:{
    backgroundColor:'blue',
    borderRadius:12
  },
  text:{
    color:"white"
  }
});
