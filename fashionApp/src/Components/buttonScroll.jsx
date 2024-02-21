import React from 'react'
import { View,Text } from 'react-native'

export default function ButtonScroll({name}) {
    console.log('ButtonScroll')
  return (
    <View style={{alignItems:'center',borderWidth:1,padding:10,width:"20%", borderRadius:50,borderColor:'#bcbcbc'}}>
        <Text style={{}}>{name}</Text>
    </View>
  )
}
