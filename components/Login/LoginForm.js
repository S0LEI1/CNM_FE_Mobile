import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { login, loginAPI } from "../../utils/api/LoginAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../UI/LoadingOverlay";
import { addToken } from "../../redux/authSlice";
const LoginForm = () => {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({
    phoneNumber: "",
    password: "",
  });
  const authToken = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId")
      try {
        if (token) {
          const payload = {token, userId}
          navigation.replace("Home");
          dispatch(addToken(payload));
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkLogin();
  }, []);
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: enteredValue,  
      };
    });
  }
  async function loginWithPhoneNumberHandler(phoneNumber, password) {
    const {token, userId} = await loginAPI(phoneNumber, password);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId);
    if(token && userId){
      const payload = {token, userId};
      dispatch(addToken(payload));
      navigation.navigate("Home");
    }
  }
  return (
    <View style={styles.container}>
      <Input
        title={"Phone number: "}
        placeholder={"Enter your phone number"}
        inputConfig={{
          value: inputValues.email,
          onChangeText: inputChangeHandler.bind(this, "phoneNumber"),
          keyboardType: "decimal-pad",
        }}
      />
      <Input
        title={"Password"}
        placeholder={"Enter your password"}
        inputConfig={{
          value: inputValues.password,
          onChangeText: inputChangeHandler.bind(this, "password"),
        }}
      />
      <Button title={"Sign in"} onPress={loginWithPhoneNumberHandler.bind(this, inputValues.phoneNumber, inputValues.password)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});
