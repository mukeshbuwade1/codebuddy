import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { propsType } from '../types/buttonCom'

const ButtonComp = ({title,onPress,boxStyle,secondary}:propsType) => {
  return (
    <TouchableOpacity onPress={onPress} 
    style={[styles.box,{backgroundColor:!secondary?colors.primary:colors.white},boxStyle??{}]}

    >
      <Text style={[styles.text,{color:secondary?colors.primary:colors.white}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComp

const styles = StyleSheet.create({
    box: {
        borderWidth: 2,
        height: 45,
        borderRadius: 5,
        borderColor: colors.primary,
        paddingHorizontal: 10,
        marginVertical:10,
        justifyContent:"center",
        alignItems:"center",
        zIndex:99
    },
    text:{
        fontSize:16,
        fontWeight:"700",
    }
})