import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const GroupInput = ({style, onSelectImage,selectedImage, inputConfig, isValid}) => {
  
  return (  
    <View style={[styles.container, style]}>
      <Pressable onPress={onSelectImage} style={({pressed}) => [styles.imageContainer, pressed && styles.pressed]}>
        {!selectedImage ? <Ionicons name="image-outline" size={30} /> : <Image style={styles.image} source={{uri: selectedImage.uri}}/>}
      </Pressable>
      <View style={[styles.inputContainer, isValid && styles.error]}>
        <TextInput style={styles.input} placeholder="Nhập tên nhóm" {...inputConfig} />
      </View>
    </View>
  );
};

export default GroupInput;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    marginVertical: 8,
    alignItems:"center",
    justifyContent:"space-around"
  },
  // imageContainer:{
  //   // borderWidth:1,
  //   // borderColor:"#D8D8D8",
  //   // padding:12,
  //   borderRadius:24
  // },
  inputContainer: {
    width: "80%",
    height: "80%",
    borderRadius:12,
    borderWidth:1,
    borderColor:"#D8D8D8",
  },
  input: {
    width: "100%",
    height: "100%",
    padding:12,
    fontSize:16
  },
  image:{
    width:48,
    height:48,
    borderRadius:24
  },
  pressed:{
    borderColor:"#3888FF",
    borderWidth:1,
    padding:6,
    borderRadius:24
  },
  error:{
    borderColor:"red"
  }
});
