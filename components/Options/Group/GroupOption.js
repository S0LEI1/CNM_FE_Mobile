import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "../../UI/IconButton";

const GroupOption = ({onDeleteGroup, onLeaveGroup, leaderId, userId}) => {
  return (
    <View>
      <IconButton
      onPress={onLeaveGroup}
        icon={"exit-outline"}
        color={"#FF0000"}
        title={"Rời khỏi nhóm"}
        size={24}
        style={styles.deleteButton}
        textStyle={styles.text}
      />
      {
        leaderId === userId ? <IconButton
        onPress={onDeleteGroup}
        color={"#FF0000"}
        title={"Giải tán nhóm"}
        size={24}
        style={styles.deleteGroupButton}
        textStyle={styles.deleteGroupText}
      /> : null
      }
    </View>
    
  );
};

export default GroupOption;

const styles = StyleSheet.create({
    deleteButton:{
        marginTop:12
      },
      text:{
        fontSize:18,
        marginHorizontal:12
      },
      deleteGroupButton:{
        marginTop:12,
        textAlign:"center",
        justifyContent:'center'
      },
      deleteGroupText:{
        fontSize:18,
        marginHorizontal:12,
        color:"#FF0000"
      }
});
