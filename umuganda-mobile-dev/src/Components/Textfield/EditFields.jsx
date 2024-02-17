import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

export const EditFields = ({ placeholder, icon, customHeight, Onchange, value, secureTextEntry, multiline }) => {
  return (
    <View style={styles.Input}>
    <TextInput
      placeholder={placeholder}
      onChangeText={Onchange}
      value={value}
      multiline={multiline}
      style={{
        width: 350
      }}
      secureTextEntry={secureTextEntry}
      keyboardType={placeholder === "Email" ? "email-address" : "default"}
    />
    {icon}
  </View>
  )
}


const styles = ScaledSheet.create({
    Input: {
        width: "300@s",
        height: "38@s",
        borderBottomWidth: "0.5@s",
        textDecorationColor: "black",
        marginVertical: "5@s",
        // elevation:'5@s',
        padding: "10@vs",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
      },
})