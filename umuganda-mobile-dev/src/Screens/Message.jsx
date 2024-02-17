import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

export const Message = () => {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.sender}>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
          <View style={styles.sendertext}>
            <Text style={styles.upTitle}>Kamali, 0782378378</Text>
            <Text>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
        </View>
        <View style={styles.receiver}>
          <View style={styles.receiverText}>
            <Text style={styles.upTitle2}>Kamali, 0782378378</Text>
            <Text style={{ color: "white" }}>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
        </View>
        <View style={styles.sender}>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
          <View style={styles.sendertext}>
            <Text style={styles.upTitle}>Kamali, 0782378378</Text>
            <Text>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
        </View>
        <View style={styles.receiver}>
          <View style={styles.receiverText}>
            <Text style={styles.upTitle2}>Kamali, 0782378378</Text>
            <Text style={{ color: "white" }}>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
        </View>
        <View style={styles.sender}>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
          <View style={styles.sendertext}>
            <Text style={styles.upTitle}>Kamali, 0782378378</Text>
            <Text>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
        </View>
        <View style={styles.receiver}>
          <View style={styles.receiverText}>
            <Text style={styles.upTitle2}>Kamali, 0782378378</Text>
            <Text style={{ color: "white" }}>
              Mu muganda wi'ki cyumkweru tuzubaa iteme munsi y'urugo rwa David.
              Iki gikorwa cyari kimaze igihe kinini gitekerezwaho kuko iryo
              teme.
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/Dim.jpg")}
              style={styles.profile}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TextInput style={styles.input} placeholder="Andika Ubutumwa" />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Ohereza</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
 
  input: {
    backgroundColor: "#D9D9D9",
    height: "39@s",
    width: "260@s",
    borderRadius: "20@s",
    marginRight: "5@s",
    padding:"8@s"
  },
  bottom: {
    flexDirection: "row",
    position:"absolute",
    top:"575@s",
    marginHorizontal:"10@s"
  },
  btn: {
    backgroundColor: "#0E5A64",
    width: "75@s",
    height: "39@s",
    borderRadius: "30@s",
  },
  text: {
    fontWeight: "700",
    fontSize: "11@s",
    color: "white",
    alignSelf: "center",
    marginTop: "10@s",
    marginRight: "18@s",
  },
  profile: {
    height: "30@s",
    width: "30@s",
    borderRadius: "50@s",
    marginHorizontal:"5@s"
  },
  sender: {
    flexDirection: "row",
    
  },
  sendertext: {
    backgroundColor: "#93A8AB",
    width: "221@s",
    height: "120@s",
    padding: "10@s",
    borderBottomLeftRadius: "20@s",
    borderBottomEndRadius: "20@s",
    borderTopEndRadius: "20@s",
  },
  upTitle: {
    fontWeight: "bold",
    marginBottom: "10@s",
  },
  receiver: {
    flexDirection: "row",
    marginLeft: "70@s",
    marginTop: "20@s",
    marginBottom: "20@s",
  },
  receiverText: {
    backgroundColor: "#0E5A64",
    width: "221@s",
    height: "120@s",
    padding: "10@s",
    borderBottomLeftRadius: "20@s",
    borderBottomEndRadius: "20@s",
    borderTopEndRadius: "20@s",
  },
  upTitle2: {
    fontWeight: "bold",
    marginBottom: "10@s",
    color:'white'
  },
  page:{
    height:"500@s"

  }
});
