import axios from "axios";
import { PORT } from "./port";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function loginAPI(phoneNumber, password) {
  const response = await axios
    .post(PORT + "/auth/login", {
      phoneNumber: phoneNumber,
      password: password,
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  const token = response.data.token;
  const userId = response.data.userId;
  return {token, userId};
}

export async function getUserByIdAPI() {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.user;
}
// export async function logout(){
//   const token = await AsyncStorage.getItem("token");

// }