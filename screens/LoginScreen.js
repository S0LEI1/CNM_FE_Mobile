import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../components/UI/Input";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.signIn}>Sign in</Text>
        <Text>Sign In Your Account</Text>
      </View>
      <LoginForm />
      <Pressable onPress={() => navigation.navigate("RegisterForm")}>
        <Text>Don't have an account</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={{ color: 'blue', marginLeft: 4 }}>Forget Password</Text>
        </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 18,
    margin: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  signIn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});
