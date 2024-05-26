import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupInput from "../components/Group/GroupInput";
import ConversationItem from "../components/ShareMessage/ConversationItem";
import ListFriend from "../components/Group/ListFriend";
import FriendOutput from "../components/Group/FriendOuput";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { refeshAddMember } from "../redux/conversationSlice";
import { createGroupAPI } from "../utils/api/ConversationAPI";

const CreateGroup = ({ navigation }) => {
  const { friends } = useSelector((state) => state.friends);
  const { addMember } = useSelector((state) => state.conversations);
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    chatName: { value: "", isValid: true },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      // setInputValues({ image: result.assets[0] });
    } else {
      alert("Không có hình ảnh nào được chọn.");
    }
  };
  async function createGroupHandler() {
    const memberIds = addMember.map((member) => member._id);
    const chatNameIsValid = inputValues.chatName.value.trim().length > 0;
    if(!chatNameIsValid){
      setInputValues((currentValue) =>{
        return {
          chatName: currentValue.chatName.value, isValid: false
        }
      })
      return;
    }
    await createGroupAPI(inputValues.chatName.value, selectedImage, memberIds);
    dispatch(refeshAddMember());
    navigation.pop();
  }
  function leaveCreateGroupHandler() {
    navigation.pop();
    dispatch(refeshAddMember());
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chia sẻ",
      headerLeft: (color) => (
        <Ionicons
          name="arrow-back"
          size={24}
          color={color}
          onPress={leaveCreateGroupHandler}
        />
      ),
    });
  }, [navigation]);
  const nameIsInvalid = !inputValues.chatName.isValid;
  return (
    <View style={styles.container}>
      <GroupInput
        onSelectImage={pickImageAsync}
        selectedImage={selectedImage}
        isValid={nameIsInvalid}
        inputConfig={{
          value: inputValues.chatName.value,
          onChangeText: inputChangeHandler.bind(this, "chatName"),
        }}
      />
      {
        nameIsInvalid && <Text style={styles.errorText}>Tên không được để trống</Text>
      }
      <ListFriend
        style={styles.listFriendContainer}
        friends={friends}
        title={"Danh sách bạn bè"}
      />
      {addMember.length >= 2 && (
        <FriendOutput
          onPress={createGroupHandler}
          style={styles.friendOutputContainer}
          friendData={addMember}
        />
      )}
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    flex: 1,
  },
  listFriendContainer: {
    flex: 7,
    marginTop:12
  },
  friendOutputContainer: {
    flex: 1,
    width: "95%",
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    // position: "absolute",
    bottom: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText:{
    fontSize:13,
    color:"red",
    marginLeft:60
  }
});
