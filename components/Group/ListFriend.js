import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendItem from "./FriendItem";

const ListFriend = ({style, title, friends}) => {
  function renderFriendItem(itemData) {
    return <FriendItem {...itemData.item} />;
  }
  return (
    <View style={style}>
      <Text style={{fontSize:16}}>{title}</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item._id}
        renderItem={renderFriendItem}
      />
    </View>
  );
};

export default ListFriend;

const styles = StyleSheet.create({});
