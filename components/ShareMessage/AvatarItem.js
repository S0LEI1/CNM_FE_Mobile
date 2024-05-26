import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeShareConversation } from '../../redux/MessageSlice';

const AvatarItem = ({avatar, _id}) => {
    // const dispatch = useDispatch();
    // function removeShareAvatarHandler(){
    //     dispatch(removeShareConversation(_id))
    // }
  return (
    <Pressable style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: avatar }}  />
    </Pressable>
  )
}

export default AvatarItem

const styles = StyleSheet.create({
    imageContainer:{
        padding:4,
        marginVertical:8
    },  
    image:{
        width:50,
        height:50,
        borderRadius: 25,
        marginHorizontal:8
    }
})