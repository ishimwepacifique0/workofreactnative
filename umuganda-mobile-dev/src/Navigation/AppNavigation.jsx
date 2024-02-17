import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Login } from "../Screens/Login";
import { MainNavigation } from "./MainNavigation";
import { Abayobozi } from "../Screens/HomeScreens/abayobozi";
import { Add } from "../Screens/Add";
import { Abatwarasibo } from "../Screens/HomeScreens/abatwarasibo";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import { login as storeInfo, tokenStore } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ListOfAbayobozi } from "../Screens/subscreens/listOfAbayobozi";
import { AddActivity } from "../Screens/AddUmuturage";
import { AddUmuturage } from "../Screens/AddUmuturage";
import { MuturageEditprofile } from "../Screens/Umuturage/MuturageEditprofile";
import { MuturageProfile } from "../Screens/Umuturage/MuturageProfile";
import * as SecureStore from "expo-secure-store";
import { ListOfAbatwarasibo } from "../Screens/subscreens/listOfAbatwarasibo";
import { EventDetails } from "../Screens/eventDetails";
import { Attendance } from "../Screens/subscreens/Attendance";
import { Raporo } from "../Screens/subscreens/Raporo";
import { ListOfAbaturage } from "../Screens/subscreens/listOfAbaturage";
import { MuturageReport } from "../Screens/Umuturage/MuturageReport";
import { Abitabiriye } from "../Screens/subscreens/abitabiriye";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const logged = useSelector((state) => state.auth.isloggedIn);

  console.log(logged, "login state");

  useEffect(() => {
    getItemAsync("token").then((res) => {
      console.log(res, "token info");
      if (res != null) dispatch(tokenStore(res));
    });
    getItemAsync("logindata").then((res) => {
      console.log(JSON.parse(res).data, "logindata");
      if (res != undefined) dispatch(storeInfo(JSON.parse(res)));
    });
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {logged === true && token !== null ? (
        <>
          <Screen name="Home" component={MainNavigation} />
          <Screen name="Abayobozi" component={Abayobozi} />
          <Screen name="AddAbatwarasibo" component={Abatwarasibo} />
          <Screen name="Add" component={Add} />
          <Screen name="AddUmuturage" component={AddUmuturage} />
          <Screen name="MuturageEditProfile" component={MuturageEditprofile} />
          <Screen name="MuturageProfile" component={MuturageProfile} />
          <Screen name="ListAbayobozi" component={ListOfAbayobozi} />
          <Screen name="ListAbatwarasibo" component={ListOfAbatwarasibo} />
          <Screen name="ListAbaturage" component={ListOfAbaturage} />
          <Screen name="EventDetails" component={EventDetails} />
          <Screen name="Ubwitabire" component={Attendance} />
          <Screen name="Raporo" component={Raporo} />
          <Screen name="MuturageRaporo" component={MuturageReport} />
          <Screen name="abitabiriye" component={Abitabiriye} />
        </>
      ) : (
        <Screen name="Login" component={Login} />
      )}
    </Navigator>
  );
};
