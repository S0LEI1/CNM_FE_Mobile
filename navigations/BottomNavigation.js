import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import FriendScreen from '../screens/FriendScreen'
import {Ionicons} from '@expo/vector-icons'
import AccountScreen from '../screens/AccountScreen'
const BottomTab = createBottomTabNavigator()
const BottomNavigation = () => {
  return (
        <BottomTab.Navigator screenOptions={{
            tabBarLabelStyle:{
                fontSize:12
            }
        }}>
            <BottomTab.Screen name='Tin nhắn' component={HomeScreen} options={{
                tabBarIcon: (color, size) => <Ionicons name='chatbox-outline' size={18} color={color} />,
            }}/>
            <BottomTab.Screen name="Bạn bè" component={FriendScreen} options={{
                tabBarIcon:(color, size) => <Ionicons name='people-circle-outline' size={18} />
            }} />
            <BottomTab.Screen name="Cá nhân" component={AccountScreen} options={{
                tabBarIcon:(color, size) => <Ionicons name='person-circle-outline' size={18} />
            }} />
        </BottomTab.Navigator>
  )
}

export default BottomNavigation