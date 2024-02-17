import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScaledSheet } from 'react-native-size-matters'

export const AvatarWithNames = ({name}) => {
  return (
    <SafeAreaView>
    <View>
      <Text style={styles.name}>{name}</Text>
    </View>
    </SafeAreaView>
  )
}


const styles = ScaledSheet.create({
    name: {
        fontSize:'20@s',
        fontWeight:'bold',
        fontFamily:'Poppins_600SemiBold'
    }
})