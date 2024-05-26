import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AvatarItem from "./AvatarItem";
import { Ionicons } from "@expo/vector-icons";
const ShareOutput = ({
  shareData,
  style,
  content,
  fileUrls,
  type,
  onPress,
}) => {
  //   const { content, imageUrls, type } = message;
  function renderShareAvatar(itemData) {
    return <AvatarItem {...itemData.item} />;
  }
  return (
    <View style={style}>
      <View>
        <FlatList
          horizontal
          data={shareData}
          keyExtractor={(item) => item.conversationId}
          renderItem={renderShareAvatar}
        />
      </View>
      <View style={styles.container}>
        {type === "TEXT" ? (
          <Text>{content}</Text>
        ) : (
          <Image source={{ uri: fileUrls[0] }} width={70} height={70} />
        )}
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="send-outline" size={24} color={"#3888FF"} />
        </Pressable>
      </View>
    </View>
  );
};

export default ShareOutput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    // backgroundColor:"#3888FF",
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#3888FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#3888FF",
  },
});
