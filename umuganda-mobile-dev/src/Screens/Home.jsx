import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScaledSheet } from 'react-native-size-matters';
import { useFonts, Poppins_500Medium, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Village } from './HomeScreens/Village';
import { Groups } from './HomeScreens/Groups';


const height = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tab;

export const Home = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_400Regular });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <StatusBar style='black' backgroundColor='#F2F1F1' />
      <View style={styles.container}>
        <View style={styles.firstview}>
          <Text style={styles.names}>Ibikorwa biteganyijwe</Text>
          <Ionicons
            name="menu"
            size={24}
            color="#0E5A64" />
        </View>
         <View
            style={{
              height: '100%',
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
              <Screen name="Umudugudu" component={Village} />
              <Screen name="Isibo" component={Groups} />
            </Navigator>
          </View>
       
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#F2F1F1",
    margin: "10@s",
    // height: height,
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
    fontFamily: 'Poppins_500Medium',
    fontSize: '15@s',
    fontWeight: 'bold',
    color: '#2E3A59'
  },


});
