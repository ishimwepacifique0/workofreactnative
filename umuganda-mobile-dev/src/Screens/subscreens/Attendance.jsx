import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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
import { LoginButton } from "../../Components/Textfield";
import { Search } from "../../Components/Textfield/Search";
import { Images } from "../../Components/Imagez/Images";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { RoundedButton } from "../../Components/Button";

export const Attendance = (props) => {
  const { item } = props.route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [attendedUsers, setAttendedUsers] = useState([]);
  const [haveReasons, setHaveReasons] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [fontsLoaded] = useFonts({ Poppins_800ExtraBold, Poppins_600SemiBold, Poppins_500Medium });
  // if (!fontsLoaded) {
  //   return null;
  // }
  console.log("item", item);
  const getUsers = async () => {
    setLoading(true);
    console.log(await getItemAsync("token"));
    axios({
      method: "GET",
      url: "https://umudugudu-backend.onrender.com/api/user/isiboUsers",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${await getItemAsync("token")}`,
      },
    })
      .then((response) => {
        setLoading(false);
        setUsers(response.data.data.filter((user) => user.role == "umuturage"));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  console.log(attendedUsers, "Attended");
  console.log(haveReasons, "Reasons");

  const handleConfirmAttendance = async () => {
    // if (attendedUsers.length == 0 && haveReasons.length == 0) {
    //   alert("Kora ubwitabire bw'abaturage bose")
    //   return
    // }
    setIsLoading(true);
    let notAttended = users.filter(
      (user) =>
        !attendedUsers.includes(user._id) && !haveReasons.includes(user._id)
    );
    notAttended = notAttended.map((user) => user._id);
    console.log(notAttended, "notAttended");
    axios({
      method: "POST",
      url: "https://umudugudu-backend.onrender.com/api/attendance/make",
      data: {
        attendedUsers,
        haveReasons,
        notAtendedUsers: notAttended,
        event: item._id,
      },
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${await getItemAsync("token")}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        if (response.data.status == "success") {
          alert("Ubwitabire bw'abaturage bwakozwe neza");
          props.navigation.navigate("Fines");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Ubwitabire bw'iki gikorwa bwarakozwe");
        props.navigation.navigate("Home");
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.Topcontainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.TopcontainerText}>Ubwitabire</Text>
            {/* <Ionicons name="menu" size={24} color="black" /> */}
          </View>
          <View>
            <Text style={styles.subText}>Abaturage b' Isibo y' Imena</Text>
            <Search
              value={searchKey}
              onChangeText={(text) => setSearchKey(text)}
              icon={<EvilIcons name="search" size={24} color="blue" />}
              Placeholder={"Shakisha umuturage"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subText}>Amazina</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: 130,
              }}
            >
              <Text
                style={{
                  color: "#0E5A64",
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Yaje
              </Text>
              <Text
                style={{
                  color: "#0E5A64",
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Impamvu
              </Text>
            </View>
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
          <ScrollView style={styles.bigcontainer}>
            {users
              ?.filter((item) =>
                item.name.toLowerCase().includes(searchKey.toLowerCase())
              )
              .map((item) => {
                return (
                  <View style={styles.usersContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Images
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
                        }}
                      />
                      <Text style={styles.userNames}>{item.name}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 130,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (attendedUsers.includes(item._id)) {
                            setAttendedUsers(
                              attendedUsers.filter((user) => user !== item._id)
                            );
                          } else {
                            setHaveReasons(
                              haveReasons.filter((user) => user !== item._id)
                            );
                            setAttendedUsers([...attendedUsers, item._id]);
                          }
                        }}
                      >
                        {attendedUsers.includes(item._id) ? (
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
                      <TouchableOpacity
                        onPress={() => {
                          if (haveReasons.includes(item._id)) {
                            setHaveReasons(
                              haveReasons.filter((user) => user !== item._id)
                            );
                          } else {
                            setAttendedUsers(
                              attendedUsers.filter((user) => user !== item._id)
                            );
                            setHaveReasons([...haveReasons, item._id]);
                          }
                        }}
                      >
                        {haveReasons.includes(item._id) ? (
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
          <RoundedButton
            loading={isLoading}
            action={handleConfirmAttendance}
            text={"Emeza ubwitabire"}
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
  subText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: "15@s",
    marginVertical: "20@s",
    color: "#0E5A64",
  },
  bigcontainer: {
    flexDirection: "column",
    height: "330@vs",
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
});
