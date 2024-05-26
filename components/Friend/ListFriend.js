import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendItem from "./FriendItem";

const ListFriend = ({ friends }) => {
  function renderFriend(itemData) {
    const item = itemData.item
    return <FriendItem {...item} />;
  }
  const placeholder = (
    <View>
      <Text>Not friend</Text>
    </View>
  );
  return (
    <View>
      <Text style={styles.text}>Danh sách bạn bè</Text>
      {friends ? (
        <FlatList
          data={friends}
          keyExtractor={(item) => item._id}
          renderItem={renderFriend}
        />
      ) : (
        placeholder
      )}
    </View>
  );
};

export default ListFriend;

const styles = StyleSheet.create({
  text:{
    fontSize:16,
    fontWeight:"bold",
    marginTop:12
  }
});
