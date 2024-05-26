import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../redux/authSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const AccountScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(authSelector);
  async function logoutHandler() {
    try {
      await AsyncStorage.clear().then(() => navigation.replace("Login"))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button
        title={"Logout"}
        style={styles.logoutButton}
        onPress={logoutHandler}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
  },
});
