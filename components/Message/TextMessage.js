import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { convertCreatedAt } from "../../utils/convertData";

const TextMessage = ({ content, createAt }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.constent}>{content}</Text>

    </View>
  );
};

export default TextMessage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  constent:{
    fontSize:15
  }
  
});
