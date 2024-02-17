import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "../Screens/Home";
import { Add } from "../Screens/Add";
import { Message } from "../Screens/Message";
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Abatwarasibo } from "../Screens/HomeScreens/abayobozi";
import { Messagetop } from "../Screens/messagetop";
import { ScaledSheet } from "react-native-size-matters";
import { Profile } from "../Screens/Profile";
import { Fines } from "../Screens/Fines";
import { Attendance } from "../Screens/subscreens/Attendance";
import { AddActivity } from "../Screens/AddUmuturage";
import { MutwarasiboAdd } from "../Screens/MutwarasiboAdd";
import { ProfileMutwarasibo } from "../Screens/ProfileMutwarasibo";
import { useSelector } from "react-redux";
import { MuturageFines } from "../Screens/Umuturage/MuturageFines";
import { MuturageProfile } from "../Screens/Umuturage/MuturageProfile";
import { MuturageHome } from "../Screens/Umuturage/MuturageHome";
import { MutwarasiboHome } from "../Screens/subscreens/MutwarasiboHome";


const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export const MainNavigation = () => {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData, "yuser");
  const { role } = userData;
  console.log(role, "Rlole");

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: "#F0F0F0", height: 60 },
        tabBarActiveTintColor: "#0E5A64",
      }}
    >
      <Screen
        options={{
          title: "Ahabanza",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                style={styles.icons}
                name="ios-home-sharp"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="Home"
        component={role === 'mudugudu'
          ? Home
          : role === 'mutwarasibo'
            ? MutwarasiboHome
            : MuturageHome
        }
      />
      <Screen
        options={{
          title: "Amande",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="payments" size={size} color={color} />;
          },
        }}
        name="Fines"
        component={
          role === "mudugudu"
            ? Fines
            : role === "mutwarasibo"
              ? Fines
              : MuturageFines
        }
      />
      {role !== "umuturage" ? (
        <Screen
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => {
              return <AntDesign name="pluscircle" size={40} color="#0E5A64" />;
            },
          }}
          name="Add"
          component={role === "mudugudu" ? Add : MutwarasiboAdd}
        />
      ) : null}

      <Screen
        options={{
          title: "Ubutumwa",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="sms" size={size} color={color} />;
          },
        }}
        name="Message"
        component={Messagetop}
      />

      <Screen
        options={{
          title: "Konti",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="ios-person-sharp" size={size} color={color} />
            );
          },
        }}
        name="Profile"
        component={
          role === "mudugudu"
            ? Profile
            : role === "mutwarasibo"
              ? ProfileMutwarasibo
              : MuturageProfile
        }
      />
    </Navigator>
  );
};

const styles = ScaledSheet.create({
  icons: {
    paddingTop: "6@s",
  },
});
