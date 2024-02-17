import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";

export const FinesMudugudu = () => {
  console.log('Fineed Users')
   const getFinedCitizens = async () => {
     axios({
       method: "GET",
       url: "https://umudugudu-backend.onrender.com/api/fines/umuduguduFines",
       headers: {
         token: `Bearer ${await getItemAsync("token")}`,
       },
     })
       .then((response) => {
         console.log(response.data.data,'the people that are fined...');
       })
       .catch((error) => {
         console.log(error);
       });
   };

   useEffect(() => {
     getFinedCitizens();
   }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topPadding}>
        <StatusBar style="black" backgroundColor="#F2F1F1" />
        <Text style={styles.names}>Ubwitabire</Text>
        <Ionicons name="menu" size={30} color="#0E5A64" style={styles.icon} />
      </View>
      <Text style={styles.title}>Abaturage batarishyura Amande</Text>
      <TextInput placeholder="Shakisha umuturage" style={styles.input} />
      <View style={styles.contains}>
        <Image
          source={require("../../assets/Dim.jpg")}
          style={styles.profile}
        />
        <View style={styles.textsContains}>
          <Text style={{ fontWeight: "bold" }}>Dimitri Kwihangana</Text>
          <Text>
            Amafaranga{" "}
            <Text style={{ color: "red", fontWeight: "600" }}>5000 Rwf</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    padding: "15@s",
  },
  topPadding: {
    paddingTop: "30@s",
    padding: "20@s",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  names: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "230@s",
  },
  title: {
    fontSize: "14@s",
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: "10@s",
  },
  input: {
    backgroundColor: "#93A8AB",
    padding: "10@s",
    width: "320@s",
    height: "35@s",
    borderRadius: "10@s",
    marginBottom: "10@s",
  },
  profile: {
    height: "50@s",
    width: "50@s",
    borderRadius: "50@s",
    marginRight: "10@s",
  },
  contains: {
    flexDirection: "row",
  },
  textsContains: {
    marginLeft: "10@s",
    marginTop: "5@s",
  },
});
