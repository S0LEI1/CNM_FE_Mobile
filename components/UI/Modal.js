import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
const ModalUI = ({visible}) => {
  const [modalVisible, setModalVisible] = useState(visible ? visible : false);
  const navigation = useNavigation()
  function addFriendHandler(){
    navigation.navigate("FindFriend")
    setModalVisible(false);
  }
  function createGroupHandler(){
    navigation.navigate("CreateGroup")
    setModalVisible(false);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.button} onPress={addFriendHandler}>
              <Ionicons name="person-add-outline" size={16} />
              <Text>Thêm bạn bè</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={createGroupHandler} >
            <Ionicons name="people-outline" size={16}/>
              <Text>Tạo nhóm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalUI;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 12,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    position: 'absolute',
    right: 0,
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
  button: {
    padding: 10,
    textAlign:"left",
    flexDirection:"row",
    alignItems:"center"
  },
});
