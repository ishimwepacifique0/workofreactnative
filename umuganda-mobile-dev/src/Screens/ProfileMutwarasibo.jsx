import { StyleSheet, Text, View, Image, Modal, TouchableOpacity, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "../features/authSlice";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export const ProfileMutwarasibo = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenn, setToken] = useState("");
  const [num, setNum] = useState("");
    const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
     getItemAsync("token")
       .then((res) => {
        
         setToken(res);
         })
       .catch((error) => {
         console.log(error);
       });
   }, []);
   console.log(tokenn,'tokenn')

   useEffect(() => {
     if (tokenn) {
       getAnaData();
     }
   }, [tokenn]);

    const getAnaData = async () => {
      try {
        const response = await axios.get(
          "https://umudugudu-backend.onrender.com/api/user/countIsiboCitizens",
          {
            headers: {
              token: `Bearer ${tokenn}`,
            },
          }
        );
        console.log(response.data.data, "------------");
        setNum(response.data.data.abaturage);
      } catch (err) {
        console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrr");
      }
    };

   
  



  function handleLogout() {
    dispatch(LogoutUser())
  }


  console.log(num,'-----------------------------')
  console.log(user)
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.topItems}>
        <View>
          <Image
            source={require("../../assets/young.webp")}
            style={styles.profile}
          />
        </View>
        <View style={styles.texts}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.mudugudu}>Umuyobozi w'isibo</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons name="menu" size={30} color="#0E5A64" style={styles.icon} />
        </TouchableOpacity>
      </View>
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
            <Pressable
              style={{
                height: 50,
                width: 100,
                justifyContent: "center",
                // alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("MuturageEditProfile");
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={{
                height: 50,
                width: 100,
                // justifyContent: "center",
                // alignItems: "center",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <TouchableOpacity>
                <Text onPress={handleLogout} style={styles.modalText}>
                  Logout
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.allCards}>
        {/* <View style={styles.cards}>
          <Text style={styles.number}>10</Text>
          <Text style={styles.textNumber}>Imiryango</Text>
        </View> */}
        <TouchableOpacity
          style={{ marginLeft: 116 }}
          onPress={() => navigation.navigate("ListAbaturage")}
        >
          <View style={styles.cards}>
            <Text style={styles.number}>{num}</Text>
            <Text style={styles.textNumber}>Abaturage</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.lowMenu}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddUmuturage")}
          style={styles.profileMenu}
        >
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Shyiramo Umuturage</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.profileMenu}>
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}> Hindura umuturage</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
        <View style={styles.profileMenu}>
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Kuramo Umuturage</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
     
        <Text onPress={handleLogout} style={{ color: "red", fontSize: 20 }}>
          {/* Sohoka */}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  page: {
    padding: "10@s",
    paddingTop: "30@s",
  },
  topItems: {
    flexDirection: "row",
    marginBottom: "20@s",
  },
  profile: {
    height: "50@s",
    width: "50@s",
    borderRadius: "50@s",
    marginRight: "10@s",
  },
  name: {
    fontWeight: "bold",
    fontSize: "17@s",
    width: "240@s",
  },
  mudugudu: { color: "#A6A6A6" },
  texts: {
    marginTop: "5@s",
    width: "240@s",
  },
  cards: {
    backgroundColor: "#93A8AB",
    height: "80@s",
    width: "97@s",
    alignItems: "center",
    paddingTop: "10@s",
    borderRadius: "10@s",
    elevation: "3@s",
    marginEnd: "20@s",
  },
  number: {
    fontSize: "24@s",
    fontWeight: "700",
    color: "#0E5A64",
  },
  textNumber: {
    fontSize: "14@s",
  },
  profileMenu: {
    flexDirection: "row",
    marginBottom: "10@s",
    justifyContent: "space-between",
  },
  nameMenu: {
    fontWeight: "bold",
    fontSize: "15@s",
    marginTop: "4@s",
    color: "#2E3A59",
  },
  allCards: {
    flexDirection: "row",
    paddingBottom: "40@s",
    borderBottomWidth: "1@s",
  },
  topMenu: {
    paddingVertical: "10@s",
    borderBottomWidth: "1@s",
  },
  lowMenu: {
    paddingVertical: "10@s",
    justifyContent: "space-between",
  }, InfoContainer: {
    marginTop: "30@s",
  },
  infoAlign: {
    flexDirection: "column",
    paddingVertical: "30@s",
  },
  infoText: {
    flexDirection: "column",
    paddingTop: "10@s",
  },
  headTexts: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "18@s",
  },
  texts: {
    fontFamily: "Poppins_700Bold",
    fontSize: "15@s",
    color: "#A6A6A6",
    paddingTop: "5@s",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
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
