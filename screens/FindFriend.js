import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { findFriend, getFriendByPhoneNumber } from "../redux/FriendSlice";
import { findFriendByPhone } from "../utils/api/FriendAPI";
const FindFriend = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thêm bạn",
    });
  }, []);
  const friendSelector = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  // const [phoneNumber, setPhoneNumber] = useState("");
  // function setPhoneNumberHandler(enteredValue){
  //     setPhoneNumber(enteredValue);
  // }
  const [inputValues, setInputValues] = useState({
    phoneNumber: { value: "", isValid: true },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  async function findFriendHandler() {
    const phoneNumberIsValid =
      (inputValues.phoneNumber.value.trim().length !== 10);
      console.log("phoneNumberIsInvalid", !phoneNumberIsInvalid);
    if (phoneNumberIsValid) {
      setInputValues((currentValue) => {
        return {
          phoneNumber: currentValue.phoneNumber.value,
          isValid: false,
        };
      });
      return;
    }
    const friend = await findFriendByPhone(inputValues.phoneNumber.value);
    console.log(friend);
    if (friend === 404) {
      Alert.alert("Thêm bạn", "Số điện thoại này chưa được đăng ký");
      return;
    }
    dispatch(findFriend(friend));
    navigation.navigate("UserInfo");
  }
  const phoneNumberIsInvalid = !inputValues.phoneNumber.isValid;
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={[styles.phoneInputContainer, , phoneNumberIsInvalid && styles.buttonError]}>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>+84</Text>
          </View>
          <TextInput
            onChangeText={inputChangeHandler.bind(this, "phoneNumber")}
            value={inputValues.phoneNumber.value}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
          />
        </View>
        <Pressable onPress={findFriendHandler}>
          <View style={styles.button}>
            <Ionicons name="arrow-forward" size={24} color={"white"} />
          </View>
        </Pressable>
      </View>
      {
        phoneNumberIsInvalid && <Text style={styles.errorText}>Tên không được để trống</Text>
      }
    </View>
  );
};

export default FindFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInputContainer: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  codeContainer: {
    backgroundColor: "gray",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    flex: 6,
    height: "100%",
    padding: 8,
  },
  codeText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "blue",
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 8,
  },
  buttonError:{
    borderColor:"red"
  },
  errorText:{
    fontSize:13,
    color:"red",
    marginLeft:35
  }
});
