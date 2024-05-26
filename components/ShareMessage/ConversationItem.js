import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addShareCovnersation, removeShareConversation } from "../../redux/MessageSlice";
const ConversationItem = ({name, avatar, conversationId }) => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  function onPressHandler(){
    setCheck(!check);
    if(!check){
        const params ={conversationId, avatar}
        dispatch(addShareCovnersation(params))
    }
    if(check){ 
        dispatch(removeShareConversation(conversationId))
    }
  }
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPressHandler}
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: avatar }} />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <Ionicons
          name={check === true ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={"#3888FF"}
        />
      </View>
      
    </Pressable>
  );
};

export default ConversationItem;
const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position:"static"
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  innerContainer: {
    marginHorizontal: 8,
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
    fontWeight: "700",
  },
  lastMessage: {
    fontSize: 12,
    fontWeight: "300",
  },
  pressed: {
    opacity: 0.7,
  },
});
