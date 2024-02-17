import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";

export const Button = ({ text, icon, action, customMargin, loading }) => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={[styles.btn, { marginTop: customMargin }]}>
      <Pressable onPress={action}>
        {loading ? <ActivityIndicator style={styles.btnText} size={30} color={"#fff"} /> : (<Text style={styles.btnText}>{text}</Text>)}
        {icon}
      </Pressable>
    </View>
  );
};

const styles = ScaledSheet.create({
  btn: {
    marginTop: "30@s",
    backgroundColor: "#0E5A64",
    width: "250@s",
    height: "40@s",
    borderRadius: "30@s",
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    alignSelf: "center",
    paddingTop: "8@s",
    fontSize: "18@s",
    fontFamily: "Poppins_500Medium",
  },
});
