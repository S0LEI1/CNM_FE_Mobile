import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomNavigation from "./BottomNavigation";
import ChatScreen from "../screens/ChatScreen";
import UserInfo from "../screens/UserInfo";
import FindFriend from "../screens/FindFriend";
import AddFriend from "../screens/AddFriend";
import RegisterOPT from "../components/Login/RegisterOTP";
import RegisterForm from "../components/Login/RegisterForm";
import ShareScreen from "../screens/ShareScreen";
import CreateGroup from "../screens/CreateGroup";
import OptionScreen from "../screens/OptionScreen";
import MemberScreen from "../screens/MemberScreen";
import ForgetPassword from '../components/Login/ForgetPassword'
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterOPT" component={RegisterOPT} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="FindFriend" component={FindFriend} options={{
          presentation: "modal"
        }} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="ShareScreen" component={ShareScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="OptionScreen" component={OptionScreen} />
        <Stack.Screen name="MemberScreen" component={MemberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
