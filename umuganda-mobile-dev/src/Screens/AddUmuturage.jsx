import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";
import { AddTextField, LoginTextInput } from "../Components/Textfield";
import { RoundedButton } from "../Components/Button/RoundedButton";
import { SmallButtons } from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const   AddUmuturage = ({ navigation }) => {
  const [urugo, setUrugo] = useState("");
  const [umubare, setUmubare] = useState(1);
  const [umukuru, setUmukuru] = useState("");
  const [umuryango, setUmuryango] = useState([]);
  const [izina, setIzina] = useState("");
  const [indangamuntu, setIndangamuntu] = useState("");
  const [nimero, setNimero] = useState("");
  const [imyaka, setImyaka] = useState("");
  const [imeyiri, setImeyiri] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  console.log(userData, "user data");

  // let [fontsLoaded] = useFonts({ Poppins_500Medium });
  // if (!fontsLoaded) {
  //   return null;
  // }
  const [showMenu, setShoMenu] = useState(false);

  const scrollDown = () => {
    setShoMenu(!showMenu);
  };

  useEffect(() => { }, [])

  const addUmuryango = () => {
    setLoading(true);
    if (!urugo === "" || !umukuru === "") {
      alert("Uzuza ibisabwa byose");
      setLoading(false);
    } else {
      umuryango.forEach((item) => {
        if (item.izina === umukuru) {
          item.familyHead = true;
        }
      })
      console.log(umuryango, "umuryango");
      axios({
        method: "POST",
        url: "https://umudugudu-backend.onrender.com/api/citizen/create",
        data: {
          umudugudu: userData.umudugudu,
          isibo: userData.isibo,
          igipangu: urugo,
          number: umubare,
          familyMembers: umuryango,
        }
      }).then((res) => {
        console.log(res.data, "res");
        if (res.data.status === "success") {
          alert("Gushyiramo abaturage byagenze neza");
          setUmuryango([]);
          setIzina("");
          setIndangamuntu("");
          setNimero("");
          setImeyiri("");
          setImyaka("");
          setUmukuru("");
          setUrugo("");
          setUmubare(1);
          setLoading(false);
          navigation.navigate("Home");
        }
      }).catch((err) => {
        setLoading(false);
        console.log(err, "err");
      })
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_500Medium });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.Head}>Shyiramo umuturage</Text>
          <View style={styles.firstView}>
            <View style={{marginRight:30}}>
              <Text style={styles.texts}>Igipangu</Text>
              <AddTextField placeholder={"Shyiramo igipangu"} value={urugo} onChangeText={(text) => {
                setUrugo(text)
              }} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.texts}>Umubare</Text>
              <AddTextField placeholder={"Umubare w'abaturage"} value={umubare} onChangeText={(text) => {
                setUmubare(text)
              }} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>Umukuru w' umuryango</Text>
            <LoginTextInput
              value={umukuru}
              Onchange={(text) => {
                setUmukuru(text);
              }}
              placeholder={"Andika amazina y' umukuru w' umuryango"}
            />
            <Text style={styles.texts}>Amazina y' abanyamuryango</Text>
          </View>
          <View>
            {
              umuryango.length < 1 ? (<Text style={{
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "Poppins_500Medium",
              }}>
                Shyiramo abanyamuryango
              </Text>) :
                umuryango
                  .map((item, index) => {
                    return (
                      <Text style={styles.texts}>
                        {index + 1}. {item.name}
                      </Text>
                    );
                  })}
          </View>
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
                  <Text style={styles.texts}>Amazina y'umuturage</Text>
                  <LoginTextInput
                    placeholder={"Andika amazina y' umunyamuryango"}
                    value={izina}
                    Onchange={(text) => {
                      setIzina(text);
                    }}
                  />
                  <Text style={styles.texts}>Indangamuntu</Text>
                  <LoginTextInput
                    value={indangamuntu}
                    Onchange={(text) => {
                      setIndangamuntu(text);
                    }}
                    placeholder={"Shyiramo nimero y'indangamuntu"}
                  />
                  <Text style={styles.texts}>Imeyiri</Text>
                  <LoginTextInput
                    value={imeyiri}
                    Onchange={(text) => {
                      setImeyiri(text);
                    }}
                    placeholder={"Shyiramo imeyiri yo koherezaho amakuru ya konti"}
                  />
                  <Text style={styles.texts}>Imyaka</Text>
                  <LoginTextInput
                    value={imyaka}
                    Onchange={(text) => {
                      setImyaka(text);
                    }}
                    placeholder={"Shyiramo imyaka y'umuturage"}
                  />
                  <Text style={styles.texts}>Nimero ya telefoni</Text>
                  <LoginTextInput
                    value={nimero}
                    Onchange={(text) => {
                      setNimero(text);
                    }}
                    placeholder={"Shyiramo nimero ya telefoni y' umuturage"}
                  />
                  <View>
                    <Text style={styles.textInfo}>
                      *Shishoza neza mbere yo kwemeza umwirondoro*
                    </Text>
                  </View>
                  <RoundedButton
                    style={[styles.button, styles.buttonClose]}
                    action={() => {
                      if (!izina && !indangamuntu && !nimero && !imyaka) {
                        alert("Uzuza umwirondoro wose");
                      }
                      if (izina && indangamuntu && nimero && imyaka) {
                        let user = {
                          name: izina,
                          id: indangamuntu,
                          age: imyaka,
                          email: imeyiri,
                          tel: nimero
                        }
                        setUmuryango([...umuryango, user]);
                        setIzina("");
                        setIndangamuntu("");
                        setNimero("");
                        setImeyiri("");
                        setImyaka("");
                        setModalVisible(!modalVisible)
                      }
                    }}
                    text={"Emeza umuturage"}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
          {
            umuryango.length < umubare && (<SmallButtons
              style={[styles.button, styles.texts, styles.buttonOpen]}
              action={() => setModalVisible(true)}
              text={"Ongeramo umuturage"}
            />)
          }
          <RoundedButton loading={loading} disabled={umuryango.length < umubare} action={addUmuryango} text={"Emeza igikorwa"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "14@s",
  },
  Head: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: "18@s",
    textAlign: "center",
  },
  firstView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30@s",
    justifyContent: "space-between",
  },
  flex: {
    flexDirection: "column",
  },
  texts: {
    fontSize: "13@s",
    fontFamily: "Poppins_500Medium",
    marginVertical: "3@s",
    color: "#2E3A59",
  },
  textInfo: {
    textAlign: "center",
    marginVertical: "5@s",
    color: "#0E5A64",
  },
  centeredView: {
    flex: 1,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(138, 176, 194, 0.37)",
  },
  modalView: {
    backgroundColor: "white",
    width: "340@s",
    borderRadius: "20@s",
    padding: "15@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
