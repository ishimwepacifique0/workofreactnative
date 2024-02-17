import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { getItemAsync } from "expo-secure-store";
import axios, { Axios } from "axios";
import { AddTextField } from "../../Components/Textfield";
import { DisabledField } from "../../Components/Textfield/DisabledField";

const height = Dimensions.get("window").height;

export const MuturageFines = () => {
  const [userToken, setUserToken] = useState();
  const [userFines, setUserFines] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState()
  const [userPayment, setUserPayment] = useState();
  const [isPaid, setIsPaid] = useState(false);

  // getting token from store where we have setted it

  getItemAsync("token")
    .then((res) => {
      // console.log(res, '99999999999999999999999999999999999999999999999999999999')
      setUserToken(res);
    })
    .catch((err) => console.log(err));

  //fetching fines from isibo or mudugudu

  function getFines() {
    axios({
      method: "get",
      url: "https://umudugudu-backend.onrender.com/api/fines/mine",
      headers: {
        token: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(
        //   res.data.data,
        //   "///////////////////////////////////////////////////"
        // );
        setUserFines(res.data.data);
      })
      .catch((err) => console.log(err));
  }
  

  useEffect(() => {
    if (userToken) {
      getFines();
    }
  }, [userToken]);

  const pay =() =>{
    axios({
      method:'POST',
      url:'https://umudugudu-backend.onrender.com/api/payment/pay',
      data:{number},
      headers: {
        token: `Bearer ${userToken}`,
      },
    }).then((res) => {
      // console.log(res.data)
      setUserPayment(res.data)
      setIsPaid(true)
    }).catch((err) => console.log(err, "hhhhhhhhhhhhhhhhhh"));
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <AntDesign name="arrowleft" size={30} color="#0E5A64" />
            <Text style={styles.headerText}>AMANDE</Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.contentAlign}>
              <Text style={styles.finesText}>Igiteranyo cy' amande yose :</Text>
              <Text style={styles.PriceText}>Total</Text>
            </View>
            {userFines?.map((item, key) => {
              return (
                (key = { key }),
                (
                  <View style={styles.FinesContainer}>
                    <Text style={styles.moneyText}>
                      Amafaranga: {item.amount}
                    </Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.reasonText}>Impanvu:</Text>
                      <Text style={styles.texts}> Kutitabira</Text>
                      <Text style={styles.texts}> {item.event.title} </Text>
                    </View>
                    <Text style={styles.textParag}>
                      {item.event.description}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.dates}>
                        Italiki {item.event.date}
                      </Text>
                      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.payContainer}>
                        <Modal
                          animationType="slide"
                          presentationStyle="fullScreen"
                          transparent={true}
                          visible={modalVisible}
                        >
                          <TouchableOpacity
                            style={styles.centeredView}
                            onPress={() => setModalVisible(false)}
                          >
                            <View style={styles.modalView}>
                              <View style={styles.containerMoney}>
                              <Text style={styles.money}>
                                Ishyura amafaranga: {item.amount}
                              </Text>
                              </View>
                              <AddTextField 
                              placeholder={'Shyiramo nimero uribukoreshe wishyura'}
                              onChangeText={(text) => setNumber(text)}
                              />
                              <TouchableOpacity
                              onPress={() => pay()}
                              >
                              <Text  style={styles.ishyuraText}>Emeza Igikorwa</Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </Modal>
                        <Text onPress={() => setModalVisible(!modalVisible)}style={styles.payText}>{isPaid ? 'Paid' : 'Pay'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  ishyuraText: {
    color: 'white',
    backgroundColor:'#0E5A64',
    padding:'10@s',
    marginTop:'20@s',
    borderRadius:'8@s',
    fontFamily:'Poppins_800ExtraBold'
  },
  containerMoney: {
    marginBottom: '60@s',
  },
  money: {
    fontFamily:'Poppins_600SemiBold',
    color:'#0E5A64',
    fontSize:'15@s'
  },
  container: {
    margin: "20@s",
  },
  headerView: {
    flexDirection: "row",
  },
  headerText: {
    fontFamily: "Poppins_700Bold",
    fontSize: "20@s",
    marginHorizontal: "90@s",
    color: "#0E5A64",
  },
  mainContent: {
    marginTop: "20@s",
  },
  contentAlign: {
    flexDirection: "row",
  },
  finesText: {
    color: "red",
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
  },
  PriceText: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    fontSize: "15@s",
    marginLeft: "10@s",
    textAlign: "center",
  },
  FinesContainer: {
    marginVertical: "10@s",
    backgroundColor: "#93A8AB",
    borderRadius: "20@s",
    padding: "20@s",
  },
  moneyText: {
    color: "#0E5A64",
    fontSize: "15@s",
    fontFamily: "Poppins_600SemiBold",
  },
  reasonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: "17@s",
    color: "black",
    // width: '90@s'
  },
  texts: {
    color: "black",
    fontSize: "12@s",
    fontFamily: "Poppins_500Medium",
    alignSelf: "center",
    // maxWidth:'100@s'
    // width: '100@s',
  },
  textParag: {
    color: "black",
    fontSize: "15@s",
    fontFamily: "Poppins_500Medium",
    // maxWidth: '50@s'
  },
  dates: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    fontSize: "17@s",
  },
  payContainer: {
    backgroundColor: "#0E5A64",
    borderRadius: "10@s",
    padding: "10@s",
  },
  payText: {
    color: "white",
    fontSize: "15@s",
    fontFamily: "Poppins_500Medium",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30@s",
  },
  modalView: {
    margin: "20@s",
    backgroundColor: "white",
    borderRadius: "10@s",
    padding: "35@s",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: "0@s",
      height: "2@s",
    },
    shadowOpacity: "0.25@s",
    shadowRadius: "4@s",
    elevation: "5@s",
  },
  modalText: {
    fontFamily: "Poppins_700Bold",
    fontSize: "15@s",
    // alignSelf:'center',
  },
});
