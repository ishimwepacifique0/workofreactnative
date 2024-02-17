import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { RoundedButton } from "../../Components/Button";
import { LoginTextInput } from "../../Components/Textfield";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { eventAdded } from "../../features/umuduguduevents";

export const Raporo = (props) => {
  const dispatch = useDispatch();
  const { item } = props.route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [ibizakorwa, setIbizakorwa] = useState([]);
  const [ikizakorwa, setIkizakorwa] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [umutwe, setUmutwe] = useState("");
  const [ibyavuzwe, setIbyavuzwe] = useState("");
  const [umwanzuro, setUmwanzuro] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("")
  const isfocused = useIsFocused();


  // console.log(item, " this is the item  when fixed I will put item._id");

  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        // console.log(res, "ooooooooooooooooooooo");
        setToken(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isfocused]);
  const createReport = async () => {
    try {
      const response = await axios.put(
        `https://umudugudu-backend.onrender.com/api/event/report/${item._id}`,
        {
          reportTitle: umutwe,
          reportBody: ibyavuzwe,
          conclusion: umwanzuro,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "raporoc ");
    } catch (err) {
      // console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrr");
    }
  };

  // console.log("ibizakorwa", ibizakorwa)
  const createActivity = async () => {
    try {
      const response = await axios.patch(
        `https://umudugudu-backend.onrender.com/api/event/eventActivities/${item._id}`, {
        activities: ibizakorwa
      },

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      dispatch(eventAdded());
      console.log(response.data.data, "activities activities ");
    } catch (err) {
      //  console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrr");
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.Topcontainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.TopcontainerText}>Raporo</Text>
            {/* <Ionicons name="menu" size={24} color="black" /> */}
          </View>
          {loading ? (
            <ActivityIndicator
              style={{
                height: 100,
              }}
              size="large"
              color="#0E5A64"
            />
          ) : null}
          <Text style={styles.texts}>Umutwe</Text>
          <LoginTextInput
            placeholder={"Shyiramo Igikorwa"}
            // value={umutwe}
            Onchange={(text) => setUmutwe(text)}
          />
          <Text style={styles.texts}>Ibyavugiwe mu nama</Text>
          <LoginTextInput
            placeholder={"Shyiramo ibyavugiwe munama"}
            // value={umutwe}
            Onchange={(text) => setIbyavuzwe(text)}
          />
          <Text style={styles.texts}>Umwanzuro</Text>
          <LoginTextInput
            placeholder={"Shyiramo umwanzuro wafashwe"}
            multiline={true}
            // value={umutwe}
            Onchange={(text) => setUmwanzuro(text)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.texts}>Ibizakorwa</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <AntDesign name="pluscircle" size={40} color="#0E5A64" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.bigcontainer}>
            {ibizakorwa?.map((item) => {
              return (
                <View style={styles.usersContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.userNames}>{item.activityTitle}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (item.status) {
                          let array = ibizakorwa;
                          let index = array.indexOf(item);
                          array[index] = {
                            ...array[index],
                            status: "completed",
                          };
                          setIbizakorwa(array);
                        } else {
                          let array = ibizakorwa;
                          let index = array.indexOf(item);
                          array[index] = { ...array[index], status: "" };
                          setIbizakorwa(array);
                        }
                      }}
                    >
                      {item?.status ? (
                        <MaterialIcons
                          name="check-box"
                          size={30}
                          color="#0E5A64"
                        />
                      ) : (
                        <MaterialIcons
                          name="check-box-outline-blank"
                          size={30}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
                  <Text style={styles.texts}>Ikizakorwa</Text>
                  <LoginTextInput
                    placeholder={"shyiramo igikorwa kizakorwa"}
                    Onchange={(text) => setIkizakorwa(text)}
                  />

                  <RoundedButton
                    style={[styles.buttonClose]}
                    action={() => {
                      if (ikizakorwa == "") {
                        alert("Shyiramo igikorwa kizakorwa");
                        return;
                      }
                      setIbizakorwa([
                        ...ibizakorwa,
                        { activityTitle: ikizakorwa, status: "" },
                      ]);
                      setIkizakorwa("");
                      setModalVisible(!modalVisible);


                    }}
                    text={"Emeza ikizakorwa"}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
          <RoundedButton
            loading={loading}
            action={() => {
              createActivity();
              createReport();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                props.navigation.navigate("Home");
                alert("Gukora raporo byagenze neza");
              }, 2000);
            }}
            text={"Emeza raporo"}
          />
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
    color: "#0E5A64",
  },
  texts: {
    fontSize: "16@s",
    fontFamily: "Poppins_500Medium",
    marginVertical: "1@s",
    color: "#2E3A59",
  },
  subText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: "15@s",
    marginVertical: "20@s",
    color: "#0E5A64",
  },
  bigcontainer: {
    flexDirection: "column",
    height: "200@vs",
  },
  usersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "130@s",
  },
  titleText: {
    fontFamily: "Poppins_500Medium",
    color: "#2E3A59",
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
    height: "700@s",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "160@s",
    backgroundColor: "rgba(138, 176, 194, 0.37)",
  },
  modalView: {
    alignSelf: "center",
    margin: "10@s",
    backgroundColor: "white",
    width: "340@s",
    height: "250@s",
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
});
