import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({title, placeholder, inputConfig, inValid}) => {
  return (
    <View style={{width:'100%', paddingVertical:16}}>
      <Text style={styles.text}>{title}</Text>
      <TextInput style={[styles.textInput, inValid && styles.textInputError]} placeholder={placeholder} {...inputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    text:{
        fontSize:16
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:"black",
        padding: 6,
    },
    textInputError:{
      borderBottomWidth:1,
      borderBottomColor:"red",
      padding: 6,
  }
})