import axios from "axios";
import { PORT } from "./port";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoImg from '../../assets/chatchit.png'
import { Image } from "react-native";
export async function getConversationByUserId() {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/conversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.conversations;
}

export async function getConversationByIdAPI(id) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/conversation/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  const conversation = {
    _id: response.data.conversation._id,
    type: response.data.conversation.type,
    name: response.data.conversation.chatName
      ? response.data.conversation.chatName
      : response.data.nameAndAvatar.name,
    avatar: response.data.conversation.avatar
      ? response.data.conversation.avatar
      : response.data.nameAndAvatar.avatar,
    leaderId: response.data.conversation.leaderId || "",
    deputyLeaderId: response.data.conversation.deputyLeaderId || [],
  };
  return conversation;
}

export async function createGroupAPI(chatName, image, memberIds) {
  console.log("image in create group", image);
  // const { default: exampleImage } = await import("../../assets/chatchit.png");
  const logoImgUri = Image.resolveAssetSource(logoImg).uri;
  const date = new Date();
  const formData = new FormData();
  formData.append("image", {
    uri: image?.uri ? image?.uri : logoImgUri,
    type: image?.mimeType || "image/png",
    name: image?.fileName || `image + ${date}`,
  });
  formData.append("chatName", chatName);
  for (let index = 0; index < memberIds.length; index++) {
    formData.append("memberIds", memberIds[index]);
  }
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(PORT + "/conversation/group", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.groupCons
  } catch (error) {
    console.log(error);
  }
}
export async function deleteMessagesByConversationIdAPI(conversationId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      PORT + "/conversation/message/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function getMembersByConversationId(conversationId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      PORT + "/conversation/member/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const members = response.data.users;
    return members;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMemberAPI(deleteUserId, conversationId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      PORT + "/conversation/member/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          deleteUserId: deleteUserId,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
export async function updateLeaderAPI(conversationId, newLeaderId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(
      PORT + "/conversation/" + conversationId + "/member/" + newLeaderId,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function addDeputyLeaderAPI(conversationId, deputyLeaderId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(
      PORT + "/conversation/" + conversationId + "/deputy/" + deputyLeaderId,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const conversation = await response.data.conversation;
    return conversation;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteDeputyLeaderAPI(conversationId, deputyLeaderId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(
      PORT +
        "/conversation/" +
        conversationId +
        "/delete/deputy/" +
        deputyLeaderId,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const conversation = await response.data.conversation;
    return conversation;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteGroupConversationAPI(conversationId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      PORT + "/conversation/group/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const conversation = await response.data.conversation;
    // return conversation;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
export async function leaveGroupAPI(conversationId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      PORT + "/conversation/member/leave/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const conversation = await response.data.conversation;
    // return conversation;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
