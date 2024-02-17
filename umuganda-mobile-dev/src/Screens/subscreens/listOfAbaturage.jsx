import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
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
import { useState, useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { useSelector } from "react-redux";

export const ListOfAbaturage = () => {
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        setToken(res);
        console.log(res, "000000000000000000000000000000");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const getIsiboList = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://umudugudu-backend.onrender.com/api/citizen/umuduguduCitizens",
        {
          headers: {
            Accept: "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(
        response.data.data,
        "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      setList(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "==================================================");
    }
  };
  console.log(list, "555555555555555555555555555555555555555");

  useEffect(() => {
    if (token) {
      getIsiboList(token);
    }
  }, [token]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.Topcontainer}>
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text style={styles.TopcontainerText}>Abayobozi</Text>
            {/* <Ionicons name="menu" size={24} color="black" /> */}
          </View>
          <View>
            <Text style={styles.subText}>Abayobozi b'Umudugudu w'Imena</Text>
            <Search
              icon={<EvilIcons name="search" size={24} color="blue" />}
              Placeholder={"Shakisha umuturage"}
            />
          </View>
          <View style={styles.bigcontainer}>
            {list.map((item, key) => {
              return (
                <View style={styles.usersContainer} key={key}>
                  <Images source={require("../../../assets/young.webp")} />
                  <View>
                    <Text style={styles.userNames}>{item.name}</Text>
                    <View style={styles.FamilyheadText}>
                      <Text style={styles.titleText}>Telefone :</Text>
                      <Text styles={styles.familychief}>{item.tel}</Text>
                    </View>
                  </View>
                  <View></View>
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
