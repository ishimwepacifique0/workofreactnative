import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import {
  Ionicons,
  AntDesign,
  EvilIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { Search } from "../../Components/Textfield/Search";
import { Images } from "../../Components/Imagez/Images";
import { Button } from "../../Components/Button";
import { LoginTextInput } from "../../Components/Textfield";
import { RoundedButton } from "../../Components/Button";
import { getItemAsync } from "expo-secure-store";
import { useSelector } from "react-redux";

import axios from "axios";
const height = Dimensions.get("window").height;

export const ListOfAbatwarasibo = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);
  const [isibo, setIsibo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  const userData = useSelector((state) => state.auth.userData);

  const { umudugudu } = userData;

  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        setToken(res);
        console.log(res, "0000000000000000000000000000000");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getIsiboList = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://umudugudu-backend.onrender.com/api/isibo/all",
        {
          headers: {
            Accept: "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "--------------------------------");
      setList(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getIsiboList(token);
    }
  }, [token]);

  const deleteIsibo = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `https://umudugudu-backend.onrender.com/api/user/delete/${list._id}`,

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      alert("Gushyiramo isibo byagenze neza");
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  };

  const createIsibo = async () => {
    if (!isibo) {
      alert("Shyiramo izina ry'isibo");
      return;
    }
    setIsLoading(true);
    setModalVisible(!modalVisible);
    try {
      const response = await axios.post(
        "https://umudugudu-backend.onrender.com/api/isibo/create",
        {
          name: isibo,
          umudugudu: umudugudu,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "creating isibo");
      navigation.navigate("Home");
      setIsLoading(false);
      alert("Gushyiramo isibo byagenze neza");
    } catch (err) {
      setIsLoading(false);
      alert("Gushyiramo isibo ntibikunze");
      console.log(err);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.texts}>Izina ry' Isibo</Text>
              <LoginTextInput
                placeholder={"shyiramo izina ry'isibo"}
                Onchange={(text) => setIsibo(text)}
              />
              {/* <Text style={styles.texts}>Umutwarasibo</Text>
              <LoginTextInput
                placeholder={"shyiramo nimero ya telefoni y' umuturage"}
              />
              <View>
                <Text style={styles.textInfo}>
                  *Shishoza neza mbere yo kwemeza umwirondoro*
                </Text>
              </View> */}
              <RoundedButton
                loading={isLoading}
                style={[styles.button, styles.buttonClose]}
                action={() => {
                  createIsibo();
                }}
                text={"Emeza Isibo"}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.Topcontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.TopcontainerText}>Amasibo</Text>
            {/* <Ionicons name="menu" size={24} color="black" /> */}
          </View>
          <View>
            <Text style={styles.subText}>Amasibo y'Umudugudu w'Imena</Text>

            <Search
              icon={<EvilIcons name="search" size={24} color="blue" />}
              Placeholder={"Shakisha umuturage"}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              text={"Ongeramo Isibo"}
              action={() => {
                setModalVisible(true);
              }}
            />
            
          </View>
          {loading ? (
            <ActivityIndicator
              style={{
                marginTop: 20,
              }}
              size="large"
              color="#2E3A59"
            />
          ) : null}

          <View style={styles.bigcontainer}>
            {list.map((item, key) => {
              return (
                <View style={styles.usersContainer} key={key}>
                  {/* <Images source={require("../../../assets/young.webp")} /> */}

                  <View>
                    <View style={styles.FamilyheadText}>
                      <Text style={styles.titleText}>
                        {key + 1}. {item.name}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    marginHorizontal: "15@s",
    marginTop: "30@s",
  },
  Topcontainer: {
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    marginBottom: "20@s",
  },
  TopcontainerText: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "15@s",
    marginLeft: "100@s",
    color: "#2E3A59",
  },
  subText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: "15@s",
    marginVertical: "20@s",
    color: "#2E3A59",
  },
  bigcontainer: {
    flexDirection: "column",
    marginTop: "40@s",
  },
  usersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10@s",
  },
  FamilyheadText: {
    flexDirection: "row",
    marginHorizontal: "10@s",
  },
  userNames: {
    marginHorizontal: "10@s",
    fontFamily: "Poppins_600SemiBold",
    color: "#2E3A59",
  },
  titleText: {
    fontFamily: "Poppins_500Medium",
    color: "#2E3A59",
    fontSize: "15@s",
  },
  familychief: {
    color: "red",
    fontSize: "15@s",
  },
  buttons: {
    // backgroundColor:'black',
    borderWidth: "0.5@s",
    width: "80@s",
    marginHorizontal: "10@s",
    padding: "3@s",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  centeredView: {
    flex: 1,
    height: "300@s",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "160@s",
    backgroundColor: "rgba(138, 176, 194, 0.37)",
  },
  modalView: {
    alignSelf: "center",
    margin: "10@s",
    backgroundColor: "white",
    width: "340@s",
    height: "550@s",
    borderRadius: "20@s",
    padding: "35@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  flex: {
    flexDirection: "column",
  },
  texts: {
    fontSize: "16@s",
    fontFamily: "Poppins_500Medium",
    marginVertical: "6@s",
    color: "#2E3A59",
  },
  textInfo: {
    textAlign: "center",
    marginVertical: "10@s",
    color: "#0E5A64",
  },
});
