import axios from "axios";
import { PORT } from "./port";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getListFriendRequest() {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/friend/list/req", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.addFriendReqs;
}

export async function accpetAddFriendAPI(id) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .put(
      PORT + "/friend/status/" + id,
      {
        status: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  console.log(response.data.conversation);
  return response.data.conversation;
}

export async function findFriendByPhone(phoneNumber) {
  let res = null;
  try {
    const token = await AsyncStorage.getItem("token");
    res = await axios.get(PORT + "/friend/find/" + phoneNumber, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.friend;
  } catch (error) {
    res = error.response.status;
    return res;
  }
}

export async function addFriendAPI(id, content) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .post(
      PORT + "/friend/add/" + id,
      { content: content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.addFriend;
}

export async function getFriendsAPI() {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/friend/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.friends;
}
