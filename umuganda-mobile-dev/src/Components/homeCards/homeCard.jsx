import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts, Poppins_500Medium, Poppins_400Regular } from "@expo-google-fonts/poppins";


export const HomeCard = ({ title, description, date, place, Onchange,igihe, category, action, navigation , disabled, buttonDisabled }) => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>{category}</Text>
      <Text style={styles.title}>{title} </Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.downcontainer}>
          <View style={styles.titles}>
            <Text style={styles.date}>
              Itariki: <Text style={{ fontWeight: "400" }}>{date}</Text>
            </Text>
            <Text style={styles.place}>
            <Text style={styles.place}>
              Isaha :
              <Text  style={styles.time}>
                {igihe}
              </Text>
              <View>  
              </View>
            </Text>
              Ahobizabera :
              <Text numberOfLines={1} style={styles.location}>
                {place}
              </Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.button}  disabled={buttonDisabled} onPress={Onchange}>
            <Text style={styles.buttonText}> {action} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#0E5A64",
    padding: "15@s",
    borderRadius: "20@s",
    marginBottom: "10@s"
  },
  title: {
    fontSize: "13@s",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
    marginBottom: "5@s",
  },
  date: {
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: "13@s"
  },
  description: {
    fontSize: "10@s",
    color: "white",
    fontFamily: "Poppins_500Medium",
    marginBottom: "5@s",

  },
  place: {
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: "13@s"
  },
  downcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#8ab0c2",
    width: "70@s",
    height: "35@s",
    borderRadius: "10@s",
    marginLeft: '10@s'
  },
  buttonText: {
    alignSelf: "center",
    marginTop: "6@s",
    fontSize: "15@s",
    fontWeight: "bold",
    color: "white",
  },
  location: {
    width: '50@s',
    fontFamily: 'Poppins_400Regular',
    fontSize: '12@s',
    overflow: 'visible'
  },
  titles: {
    width: "170@s",
  },
  time:{
    width:100
  }
});
