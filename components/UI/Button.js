import { View, Text, Pressable, Touchable, StyleSheet } from "react-native";
import React from "react";

const Button = ({ title, onPress, style, disabled }) => {
  return (
    <Pressable
    disabled={disabled}
      style={({ pressed }) => [
        style,
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    textAlign:"center"
  },
  pressed: {
    opacity: 0.7,
  },
});
