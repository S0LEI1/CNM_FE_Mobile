import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const FriendItem = ({ avatar, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: avatar }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Ionicons size={24} name="call-outline" />
        <Ionicons size={24} name="chatbox-outline" />
      </View>
    </View>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    padding:12
  },
  infoContainer:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-around",
    width:"65%"
  } , 
  buttonContainer:{
    flexDirection:"row",
    justifyContent:'center',
    width:"35%",
    justifyContent:"space-around",
  }, 
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "stretch",

  },
  name:{
    fontSize:16,
  }
});
