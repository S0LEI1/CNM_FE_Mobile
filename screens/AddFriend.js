import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import { addFriendAPI } from "../utils/api/FriendAPI";
import { addFriend } from "../redux/FriendSlice";

const AddFriend = ({ navigation }) => {
  const userInfo = useSelector((state) => state.friends.friendInfo);
  const dispatch = useDispatch();
  const [content, setContent] = useState("Rất vui được kết bạn với bạn....");
  function setContentHandler(enteredValue) {
    setContent(enteredValue);
  }
  useLayoutEffect(() =>{
    navigation.setOptions({
      title:"Kết bạn"
    })
  })
  async function addFriendHandler() {
    const params = {
      id: userInfo._id,
      content: content,
    };
    dispatch(addFriend(params));
    navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userInfo.avatar }} width={200} height={200} borderRadius={100} />
        <Text style={styles.name}>{userInfo.name}</Text>
      </View>
      <View>
        <TextInput style={styles.input} multiline={true} value={content} onChangeText={setContentHandler} />
      </View>
      <View>
        <Button
          style={styles.button}
          title={"Kết bạn"}
          onPress={addFriendHandler}
        />
      </View>
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
  },
  imageContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginVertical:12
  },
  name:{
    fontSize:16,
    fontWeight:"bold"
  },
  input:{
    borderWidth:1,
    minHeight:100,
    padding:12,
    margin:12,
    textAlignVertical: 'top'
  }
});
