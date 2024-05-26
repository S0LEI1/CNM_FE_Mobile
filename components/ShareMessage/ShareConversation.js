import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ConversationItem from "./ConversationItem";

const ShareConversation = ({ conversations, style, title }) => {
  function renderShareConversation(itemData) {
    return <ConversationItem {...itemData.item} />;
  }
  return (
    <View style={style}>
      <Text>{title}</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.conversationId}
        renderItem={renderShareConversation}
      />
    </View>
  );
};

export default ShareConversation;

const styles = StyleSheet.create({});
