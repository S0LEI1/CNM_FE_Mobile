import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MemberItem from "../components/Options/Group/MemberItem";
import openSocket from "socket.io-client";
import { PORT } from "../utils/api/port";
import { deleteMember, fetchConversation, fetchMembers } from "../redux/conversationSlice";

const MemberScreen = () => {
  const navigation = useNavigation();
  const { members, conversation } = useSelector((state) => state.conversations);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Danh sách thành viên",
    });
  }, []);
  const socket = openSocket(PORT);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("update-member", (data) => {
        dispatch(fetchMembers(data))
    });
    socket.on("add-deputy-leader",(data)=>{
      if(data.action ==="patch"){
        const params = data.conversationId
        dispatch(fetchConversation(params))
        dispatch(fetchMembers(params));
      }
    })
    socket.on("delete-deputy-leader",(data)=>{
      if(data.action ==="patch"){
        const params = data.conversationId
        dispatch(fetchConversation(params))
        dispatch(fetchMembers(params));
      }
    })
  }, []);
  function renderMembersHandler(itemData) {
    return <MemberItem {...itemData.item} />;
  }
  return (
    <View style={{flex:1, marginHorizontal:12}}>
      <FlatList
        data={members}
        keyExtractor={(item) => item._id}
        renderItem={renderMembersHandler}
      />
    </View>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({});
