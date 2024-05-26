import { FlatList, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons'
import AvatarItem from "../ShareMessage/AvatarItem";
const FriendOutput = ({ friendData, style,onPress }) => {
  function renderShareAvatar(itemData) {
    return <AvatarItem {...itemData.item} />;
  }
  return (
    <View style={[style, styles.container]}>
        <FlatList
          horizontal
          data={friendData}
          keyExtractor={(item) => item._id}
          renderItem={renderShareAvatar}
        />
        <Pressable onPress={onPress} style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}>
            <Ionicons name="arrow-forward" size={24} color={"#fff"} />
        </Pressable>
    </View>
  );
};

export default FriendOutput;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    buttonContainer:{
        backgroundColor:"#3888FF",
        width:40,
        height:40,
        borderWidth:1,
        borderColor:"#3888FF",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    pressed:{
        opacity:0.7,
        backgroundColor:"#3888FF"
    }
});
