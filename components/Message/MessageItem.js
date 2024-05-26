import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getUserByIdAPI } from "../../utils/api/LoginAPI";
import { useDispatch, useSelector } from "react-redux";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import MessageModal from "../UI/MessageModal";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteMessageOnlyMe,
  deleteMessage,
  getShareMessage,
} from "../../redux/MessageSlice";
import {
  deleteMessageAPI,
  deleteMessageOnlyMeAPI,
} from "../../utils/api/MessageAPI";
import DeleteMessage from "./DeleteMessage";
import IconButton from "../UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import { convertCreatedAt } from "../../utils/convertData";
const MessageItem = ({
  content,
  senderAvatar,
  senderName,
  fileUrls,
  senderId,
  type,
  currentUserId,
  updatedAt,
  createdAt,
  style,
  isDeleted,
  deletedUserIds,
  _id,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.listMessage);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  async function removeMessageHandler(id) {
    try {
      setModalVisible(!modalVisible);
      const message = await deleteMessageAPI(id);
      dispatch(deleteMessage(message));
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteMessageonlyMeHandler(id) {
    setModalVisible(!modalVisible);
    await deleteMessageOnlyMeAPI(id);
    dispatch(deleteMessageOnlyMe(id));
  }
  function shareMessageHandler(id) {
    dispatch(getShareMessage(id));
    navigation.navigate("ShareScreen", { messageId: id });
    setModalVisible(!modalVisible);
  }
  function renderModal(id, userId, isDeleted) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.buttonContainer}>
                {/* Share message */}
                {!isDeleted && (
                  <IconButton
                    onPress={shareMessageHandler.bind(this, id)}
                    icon={"arrow-redo-outline"}
                    color={"#3888FF"}
                    title={"Chuyển tiếp"}
                  />
                )}
                {/* Delete message */}
                {userId === currentUserId && !isDeleted && (
                  <IconButton
                    icon={"reload-outline"}
                    color={"#B11B17"}
                    title={"Thu hồi"}
                    onPress={removeMessageHandler.bind(this, id)}
                  />
                )}
                {/* Delete message only me */}
                <IconButton
                  icon={"trash-outline"}
                  color={"#FF0000"}
                  title={"Xóa phía bạn"}
                  onPress={deleteMessageonlyMeHandler.bind(this, id)}
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  function onLongPressHandler() {
    // if (isDeleted === true) {
    //   return;
    // }
    setModalVisible(true);
  }
  return (
    <Pressable onLongPress={onLongPressHandler}>
      <View
        style={currentUserId === senderId ? styles.reverse : styles.container}
      >
        <Image source={{ uri: senderAvatar }} style={styles.avatar} />
        <View
          style={[
            styles.messageContainer,
            currentUserId === senderId && styles.reverseMessageContainer,
          ]}
        >
          {!isDeleted ? (
            <View>
              {type === "TEXTANDFILE" || type === "IMAGE" ? (
                <ImageMessage createAt={createdAt} imageUrl={fileUrls[0]} />
              ) : (
                <TextMessage createAt={createdAt} content={content} />
              )}
              <Text style={[styles.time, currentUserId === senderId && styles.reverseMessageContainer,]}>{convertCreatedAt(createdAt)}</Text>
            </View>
          ) : (
            <DeleteMessage />
          )}
        </View>
        {renderModal(_id, senderId, isDeleted)}
      </View>
    </Pressable>
  );
};

export default MessageItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 8,
  },
  reverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  messageContainer: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 8,
    borderRadius: 12,
  },
  reverseMessageContainer: {
    justifyContent: "flex-end",
    textAlign: "right",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    margin: 8,
  },
  modalView: {
    backgroundColor: "white",
    padding: 16,
    position: "absolute",
    borderRadius: 8,
    bottom: 10,
    // margin:16,
    width: "100%",
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
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  time: {
    fontSize: 10,
    marginHorizontal:12,
    marginBottom:6
  },
  timeReverse:{
    textAlign:"right"
  }
});
