import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { deleteItemAsync } from "expo-secure-store";
import {
  logout as storeInfo,
  LogoutUser,
  tokenStore,
} from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { id } from "date-fns/locale";
import { Avatar } from "react-native-elements";
// import { AvatarWithNames } from "../../Components/Avatar";

export const MuturageProfile = ({ navigation, route }) => {
  const [userToken, setUserToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState({});
  const [userId, setUserId] = useState(null)
  const [userLoginId, setUserLoginId] = useState()
  const dispatch = useDispatch();
  const userEdited = useSelector(state=>state.auth.userEdited)


//  console.log(userEdited, 'llllllllllllllllllllllllllllllllllllllllllllllll')
  getItemAsync("token")
    .then((res) => {
      setUserToken(res);
    })
    .catch((err) => console.log(err));

    getItemAsync('logindata').then((res) => {
      // console.log(JSON.parse(res)._id, '///////////////////////////////////////////////.............................................')
      setUserLoginId(JSON.parse(res)._id)
    }).catch((err) => console.log(err))

  //get data for address of umuturage

  
  const getInfo = async (id) => {
    console.log(id, '...................////////////////////////jjjjjjjjjjjjjjjjjjjjjjjjjj')
    axios({
      method: "get",
      url: `https://umudugudu-backend.onrender.com/api/user/${id}`,
      headers: {
        token: `bearer ${userToken}`,
      },
    })
    .then((res) => {
      // console.log(res.data.data, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      setAddress(res.data.data)
    })
    .catch((err) =>
    console.log(
      err,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      )
      );
    };

    
    useEffect(() => {
      const getUserToken = async () => {
        try {
          const res = await getItemAsync("token");
          setUserToken(res);
        } catch (err) {
          console.log(err);
        }
      };
      getUserToken();
      if (userToken) {
        getInfo(userLoginId);
      }
    }, [userToken, userEdited, userLoginId] );
    

    // useEffect(() => {
    //   if(route.params && route.params.userId) {
    //     setUserId(route.params.userId);
    //   }
    // }, [route.params]);


  /// logging out user.
  function handleLogout() {
    dispatch(LogoutUser());
  }


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerHead}>
              <View style={styles.containerFlex}>
                <Text style={styles.names}>{address?.name}</Text>
                <View style={styles.containerAlign}>
                  <Text style={styles.village}>Umudugudu: </Text>
                  <Text style={styles.village}>{address?.umudugudu?.name}</Text>
                </View>
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
                    navigation.navigate("MuturageEditProfile", {userId: userLoginId});
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
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Entypo name="menu" size={30} color="#0E5A64" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          {/* <Image
            source={require("../../../assets/girl.png")}
            style={styles.image}
          /> */}
          <View>
          <Avatar  rounded size={100}  title="NW" containerStyle={{backgroundColor:'#0E5A64', alignSelf:'center', marginTop:40,}} />
          {/* <AvatarWithNames name={'M'}/> */}
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.infoAlign}>
              <View style={styles.infoText}>
                <Text style={styles.headTexts}>Izina ry'Isibo</Text>
                <Text style={styles.texts}>{address?.isibo?.name}</Text>
              </View>
              <View style={styles.infoText}>
                <Text style={styles.headTexts}>Nimero y'Indangamuntu</Text>
                <Text style={styles.texts}>{address.id}</Text>
              </View>
              <View style={styles.infoText}>
                <Text style={styles.headTexts}>Nimero y' Telefone</Text>
                <Text style={styles.texts}>{address.tel}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "20@s",
  },
  containerHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: "0.5@s",
    paddingBottom: "10@s",
  },
  containerFlex: {
    flexDirection: "column",
  },
  containerAlign: {
    flexDirection: "row",
  },
  names: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "20@s",
  },
  village: {
    fontFamily: "Poppins_700Bold",
    fontSize: "13@s",
    color: "#A6A6A6",
  },
  mainContainer: {
    marginTop: "10@s",
  },
  image: {
    width: "80@s",
    height: "80@s",
    borderRadius: "50@s",
    alignSelf: "center",
    marginVertical: "20@s",
  },
  InfoContainer: {
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
