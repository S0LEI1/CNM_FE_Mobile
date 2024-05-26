import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const ImageMessage = ({imageUrl, createAt}) => {
  return (
    <View>
      <Image style={styles.image} source={{uri: imageUrl}} /> 
    </View>
  )
}

export default ImageMessage
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    image:{
        flex:1,
        minHeight:height/5,
        minWidth: width/2
      }
})