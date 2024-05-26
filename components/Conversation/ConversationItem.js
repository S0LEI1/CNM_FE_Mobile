import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ConversationItem = ({ avatar, name, lastMessage, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: avatar }} />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.lastMessage}>{lastMessage ? lastMessage : "Chưa có tin nhắn"}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
    marginRight:12
  },
  container:{
    flexDirection:"row",
    padding:12,
  },
  innerContainer:{
    marginHorizontal:8,
    borderBottomWidth:1,
    borderBottomColor:"gray",
    width: "80%",
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    color: "black",
    fontWeight:"700"
  },
  lastMessage:{
    fontSize:12,
    fontWeight: "300"
  }
});
