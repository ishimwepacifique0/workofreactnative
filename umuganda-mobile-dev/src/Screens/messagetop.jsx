import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Message } from "./Message";
import { IsiboMessage } from "./isibomessage";
import { AbaturageMessage } from "./abaturageMessage";

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tab;

export const Messagetop = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView >
      <StatusBar style="black" backgroundColor="#F2F1F1" />
      <View style={styles.container}>
        <View style={styles.firstview}>
          <Text style={styles.names}>Ubutumwa</Text>
          <Ionicons name="menu" size={30} color="#0E5A64" />
        </View>

        <View
          style={{
            height: 650,
          }}
        >
          <Navigator
            screenOptions={{
              headerShown: false,
              alignSelf: "center",
              tabBarActiveTintColor: "#0E5A64",
              tabBarInactiveTintColor: "#ADADAD",
              tabBarIndicatorStyle: {
                backgroundColor: "#0E5A64",
                width: 30,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 81,
                marginBottom: 6,
              },
              tabBarStyle: {
                backgroundColor: "#F2F1F1",
                borderBottomWidth: 1,
                borderColor: "black",
              },
            }}
          >
            <Screen name="Umudugudu" component={Message} />
            <Screen name="Isibo" component={IsiboMessage} />
            <Screen name="Umuturage" component={AbaturageMessage} />
          </Navigator>
        </View>
      </View>
          
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#F2F1F1",
    margin: "10@s",
  },
  firstview: {
    paddingVertical: "5@s",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Firsttext: {
    fontFamily: "Poppins_500Medium",
    fontSize: "30@s",
    paddingTop: "20@s",
  },
  names: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    fontWeight: "bold",
  },
});
