import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

export const Search = ({ Placeholder, icon, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{ height: 40 }}
        placeholder={Placeholder}
        keyboardType='default'
      />
    </View>
  )
}


const styles = ScaledSheet.create({
  container: {
    height: '35@s',
    backgroundColor: "#93A8AB",
    borderRadius: '20@s',
    flexDirection: 'row',
    textDecorationColor: 'black',
    //    marginVertical:'20@s',
    alignItems: 'center',
    paddingHorizontal: '15@s'
  },
  input: {
    height: '40@s',
    width: '90@s',
  }
})