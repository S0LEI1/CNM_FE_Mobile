import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import LeaderOption from "../LeaderOption";
import {
  addDeputyLeaderAPI,
  deleteDeputyLeaderAPI,
  deleteMemberAPI,
  updateLeaderAPI,
} from "../../../utils/api/ConversationAPI";
import {
  addDeputyLeader,
  deleteDeputyLeader,
  deleteMember,
  fetchMembers,
  updateLeader,
} from "../../../redux/conversationSlice";
import { sendNofifyMessage } from "../../../utils/api/MessageAPI";
const MemberItem = ({ name, avatar, _id, leaderId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { conversation } = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  async function deleteMemberHandler(deleteUserId) {
    await deleteMemberAPI(deleteUserId, conversation._id);
    dispatch(deleteMember(deleteUserId));
    setModalVisible(!modalVisible);
    // const message = await sendNofifyMessage(conversation._id,`${name} đã bị nhóm trưởng đuổi ra khỏi nhóm`);
  }
  async function addDeputyLeaderHandler(deputyLeaderId) {
    const newConversation = await addDeputyLeaderAPI(
      conversation._id,
      deputyLeaderId
    );
    dispatch(addDeputyLeader(deputyLeaderId));
    setModalVisible(!modalVisible);
  }
  async function deleteDeputyLeaderHandler(deputyLeaderId) {
    await deleteDeputyLeaderAPI(conversation._id, deputyLeaderId);
    dispatch(deleteDeputyLeader(deputyLeaderId));
    setModalVisible(!modalVisible);
  }
  async function updateLeaderHandler(newLeaderId){
    await updateLeaderAPI(conversation._id, newLeaderId);
    dispatch(updateLeader(newLeaderId));
    setModalVisible(!modalVisible)
  }
  async function showUpdateModal(newLeaderId, name) {
    Alert.alert(
      "Thông báo",
      `${name} sẽ trở thành trưởng nhóm. Bạn sẽ trở thành một thành viên bình thường.`,
      [
        {
          text: "Hủy",
          onPress: () => console.log(),
          style: 'cancel'
        },
        {
          text: "Chuyển",
          onPress: updateLeaderHandler.bind(this, newLeaderId),
        },
      ]
    );
  }
  function renderModal(id, userId, name) {
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
                <IconButton
                  // onPress={shareMessageHandler.bind(this, id)}
                  icon={"chatbubble-ellipses-outline"}
                  color={"#3888FF"}
                  title={"Nhắn tin"}
                  size={24}
                  textStyle={styles.text}
                />
                {userId === conversation.leaderId && (
                  <LeaderOption
                    memberId={id}
                    deputyLeaderId={conversation.deputyLeaderId}
                    onDeleteMember={deleteMemberHandler.bind(this, id)}
                    onAddDeputy={addDeputyLeaderHandler.bind(this, id)}
                    onDeleteDeputy={deleteDeputyLeaderHandler.bind(this, id)}
                    onUpdateLeader={showUpdateModal.bind(this, id, name)}
                  />
                )}
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
  function showModalHandler(userId) {
    if (userId.toString() === conversation.leaderId.toString()) {
      return;
    }
    setModalVisible(!modalVisible);
  }
  return (
    <Pressable
      onPress={showModalHandler.bind(this, _id)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: avatar }} />
            </View>
            <Text style={styles.name}>{name}</Text>
          </View>
          {_id === conversation.leaderId.toString() ? (
            <Text>Nhóm trưởng</Text>
          ) : null}
          {conversation.deputyLeaderId.includes(_id) ? (
            <Text>Phó nhóm</Text>
          ) : null}
        </View>
      </View>
      {renderModal(_id, userId, name)}
    </Pressable>
  );
};

export default MemberItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    width: "100%",
    // alignItems: "center",
    // position: "static",
  },
  infoContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  innerContainer: {
    marginHorizontal: 8,
    width: "80%",
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
  },
  lastMessage: {
    fontSize: 12,
    fontWeight: "300",
  },
  pressed: {
    opacity: 0.7,
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
    // flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
  },
  // pressed: {
  //   opacity: 0.7,
  // },
  text: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});
