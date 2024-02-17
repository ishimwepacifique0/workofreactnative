import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { LoginTextInput } from "../../Components/Textfield";
import { ScaledSheet } from "react-native-size-matters";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../Components/Button";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { getItemAsync } from "expo-secure-store";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

export const Abatwarasibo = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);

  const { umudugudu } = userData;
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);
  const [value, setValue] = useState();
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  

  console.log(value, "the id of isibo");
  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        // console.log(res, "ooooooooooooooooooooo");
        setToken(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [open, setOpen] = useState(false);

  const cleanList = (array) => {
    let newArray = [];
    array.map((item) => {
      newArray.push({
        label: item.name,
        value: item._id,
      });
    });
    return newArray;
  };

  console.log(list, "............................................");
  const getIsiboList = async () => {
    try {
      const response = await axios.get(
        "https://umudugudu-backend.onrender.com/api/isibo/all",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "--");
      setList(cleanList(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    if (token) {
      getIsiboList();
    }
  }, [token]);

  const createUser = async () => {
    if (!name || !tel || !email || !value) {
      return alert('Uzuza ibikenewe byose')
    }
    setLoading(true)
    try {
      const response = await axios.post(
        "https://umudugudu-backend.onrender.com/api/user/signup",
        {
          name: name,
          email: email,
          role: "mutwarasibo",
          // id: "",
          tel: tel,
          // urugo: "",
          isibo: value,
          umudugudu: umudugudu,
        }

      );
      console.log(response.data, "creating umutwarasibo");
      // if(response.)
      setLoading(false)
      navigation.navigate("Home")
      alert('Gushyiramo mutwarasibo byagenze neza')
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>

      <StatusBar style="black" backgroundColor="#F2F1F1" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainNavigation")}
          style={styles.firstview}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#0E5A64"
          />
          <Text style={styles.names}>Shyiramo umutwarasibo</Text>
          <Ionicons
            name="menu"
            size={35}
            color="#0E5A64"
            style={styles.image}
            />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="image-plus"
          size={70}
          color="#0E5A64"
          style={styles.icon}
          />
        <DropDownPicker
          searchable={true}
          open={open}
          placeholder="Hitamo Isibo"
          value={value}
          items={list}
          setOpen={setOpen}
          setValue={setValue}
          zIndex={10}
          listMode="MODAL"
          dropDownDirection="AUTO"
          setItems={setList}
          placeholderStyle={{
            fontWeight: "bold",
            fontFamily: "Poppins_500Medium",
            color: "#0E5A64",
          }}
          style={{
            width: 140,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "transparent",
            width: 360,
            
          }}
          containerStyle={{
            height: 40,
            width: 140,
            marginBottom: 10,
          }}
          labelStyle={{
            fontWeight: "bold",
            fontFamily: "Poppins_500Medium",
            color: "#0E5A64",
          }}
        />
        <Text style={[styles.texts, {
          marginTop: 5
        }]}>Amazina y'Umutwarasibo</Text>
        <LoginTextInput
          placeholder={"Shyiramo Amazina y'umubozi"}
          Onchange={(text) => setName(text)}
        />
        <Text style={styles.texts}>Imeyiri</Text>
        <LoginTextInput
          placeholder={"Shyiramo Email"}
          Onchange={(text) => setEmail(text)}
          />
        <Text style={styles.texts}>Nomero ya telefoni</Text>
        <LoginTextInput
          placeholder={"Shyiramo Nomero ya telefoni"}
          Onchange={(text) => setTel(text)}
          />
        <Text style={styles.lastText}>
          Shishoza neza mbere yo kwemeza iki gikorwa
        </Text>
        <Button loading={loading} text={"Emeza Igikorwa"} action={createUser} />
      </View>
</ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  page: { paddingTop: "40@s" },
  container: {
    backgroundColor: "#F2F1F1",
    margin: "10@s",
  },
  firstview: {
    paddingVertical: "5@s",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  names: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    fontWeight: "bold",
    marginRight: "110@s",
    color: "black",
  },
  icon: {
    alignSelf: "center",
    marginBottom: "20@s",
  },
  texts: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    color: "#2E3A59",
  },
  lastText: {
    alignSelf: "center",
    color: "#0E5A64",
    marginVertical: "10@s",
  },
});
