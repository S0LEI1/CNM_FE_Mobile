import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Info = ({ avatar, name }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop:18,
    borderBottomWidth:5,
    borderBottomColor:"#D8D8D8",
    paddingBottom:36
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name:{
    fontSize:18,
    fontWeight: "500"
  }
});
