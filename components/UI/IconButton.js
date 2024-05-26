import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const IconButton = ({
  icon,
  color,
  title,
  onPress,
  size,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && [
          styles.pressed,
          { borderRadius: 12, backgroundColor: color },
        ],
      ]}
    >
      <Ionicons name={icon} size={size ? size : 16} color={color} />
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
