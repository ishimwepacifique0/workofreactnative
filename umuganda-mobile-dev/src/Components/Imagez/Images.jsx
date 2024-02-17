import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

export const Images = ({source}) => {
  return (
    <View>
        <Image style={styles.image}
        source={source}
        />
    </View>
  )
}


const styles = ScaledSheet.create({
    image: {
        height: '50@s',
        width:'50@s',
        borderRadius:'50@s',
        borderWidth:'2@s',
        // borderColor:'white'
    }
})