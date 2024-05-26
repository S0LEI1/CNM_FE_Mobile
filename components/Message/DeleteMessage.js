import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DeleteMessage = () => {
  return (
    <View style={styles.container}>
      <Text>Tin nhắn đã được thu hồi</Text>
    </View>
  )
}

export default DeleteMessage

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
      },
})