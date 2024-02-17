import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../features/authSlice";
import { getItemAsync } from "expo-secure-store";
import { useSelector } from "react-redux";

export const Profile = ({ navigation }) => {

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData, "nameeee");
  const { name} = userData;

  const [num, setNum] = useState({});
  const [token, setToken] = useState("");
  console.log(token,"My console log");
  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        console.log(res, "ooooooooooooooooooooo");
        setToken(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getAnalytics = async () => {
    try {
      const response = await axios.get(
        "https://umudugudu-backend.onrender.com/api/user/count",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "-------------");
      setNum(response.data.data);
    } catch (err) {
      console.log(err,'errrrrrrrrrrrrrrrrrrrrrrrr');
    }
  };

  useEffect(() => {
    if (token) {
      getAnalytics();
    }
  }, [token]);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  function handleLogout() {
    dispatch(LogoutUser());
  }
console.log(num,'+++++++++++++++++++++++++++++++++++++++')
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.mudugudu}>Umudugudu wa Kabeza</Text>
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
        <TouchableOpacity
          onPress={() => navigation.navigate("ListAbayobozi")}
          style={styles.cards}
        >
          <Text style={styles.number}>{num.abayobozi}</Text>
          <Text style={styles.textNumber}>Abayobozi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListAbatwarasibo")}
          style={styles.cards}
        >
          <Text style={styles.number}>{num.amasibo}</Text>
          <Text style={styles.textNumber}>Amasibo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cards}
          onPress={() => navigation.navigate("ListAbaturage")}
        >
          <Text style={styles.number}>{num.abaturage}</Text>
          <Text style={styles.textNumber}>Abaturage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topMenu}>
        <View style={styles.profileMenu}>
          <FontAwesome5 name="users" size={20} color="black" />
          <Text
            style={styles.nameMenu}
            onPress={() => navigation.navigate("Abayobozi")}
          >
            {" "}
            Shyiramo umuyobozi
          </Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
        <View style={styles.profileMenu}>
          <FontAwesome5 name="user-edit" size={20} color="black" />
          <Text style={styles.nameMenu}>Hindura umuyobozi</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
        <View style={styles.profileMenu}>
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Kuramo Umuyobozi</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.lowMenu}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddAbatwarasibo")}
          style={styles.profileMenu}
        >
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Shyiramo Umutwarasibo</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={{ marginLeft: 85 }}
          />
        </TouchableOpacity>
        <View style={styles.profileMenu}>
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Hindura Umutwarasibo</Text>
          <Ionicons
            name="arrow-forward"
            size={30}
            color="#0E5A64"
            style={styles.icon}
          />
        </View>
        <View style={styles.profileMenu}>
          <MaterialIcons name="group-add" size={30} color="black" />
          <Text style={styles.nameMenu}>Kuramo Umutwarasibo</Text>
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
  },
  mudugudu: { color: "#A6A6A6" },
  icon: {
    marginLeft: "95@s",
  },
  texts: { marginTop: "5@s" },
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
