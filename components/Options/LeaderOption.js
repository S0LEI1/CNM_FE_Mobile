import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "../UI/IconButton";

const LeaderOption = ({onUpdateLeader,onDeleteMember, onAddDeputy,onDeleteDeputy, memberId, deputyLeaderId}) => {
  return (
    <View style={styles.buttonContainer}>
      <IconButton
        onPress={onUpdateLeader}
        icon={"ribbon-outline"}
        color={"#3888FF"}
        title={"Bổ nhiệm làm trưởng nhóm"}
        size={24}
        textStyle={styles.text}
      />
      {
        deputyLeaderId.includes(memberId) ? <IconButton
        onPress={onDeleteDeputy}
        icon={"arrow-undo-outline"}
        color={"#FF0000"}
        title={"Xóa vai trò nhóm phó"}
        size={24}
        textStyle={styles.text}
      /> :
      <IconButton
        onPress={onAddDeputy}
        icon={"arrow-redo-outline"}
        color={"#3888FF"}
        title={"Bổ nhiệm làm nhóm phó"}
        size={24}
        textStyle={styles.text}
      />
      }
      <IconButton
        icon={"trash-outline"}
        color={"#FF0000"}
        title={"Xóa khỏi nhóm"}
        size={24}
        textStyle={styles.text}
        onPress={onDeleteMember}
      />
    </View>
  );
};

export default LeaderOption;

const styles = StyleSheet.create({
  buttonContainer: {
    // flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize:16,
    marginHorizontal:8
  }
});
