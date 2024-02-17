import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { StatusBar } from "expo-status-bar";
import { LoginTextInput } from "../Components/Textfield";
import { Button } from "../Components/Button";
import { monthsInRwanda, months, days } from "../utils/constants";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIsiboEvent, loadingTrue } from "../features/isiboEvents";

const height = Dimensions.get("window").height;

export const MutwarasiboAdd = ({ navigation }) => {
  const dispatch = useDispatch();
  const isiboAdded = useSelector((state) => state.isiboEvent.isiboEventAdded);
  const isLoading = useSelector((state) => state.isiboEvent.isLoading);
  const date = new Date();
  const scrollViewRef = useRef();
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [items, setItems] = useState(monthsInRwanda);
  const [active, setActive] = useState(
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );

  const [umutwe, setUmutwe] = useState("");
  const [ahoKizabera, setAhoKizabera] = useState("");
  const [amande, setAmande] = useState("");
  const [ikizakorwa, setIkizakorwa] = useState("");
  const [time, setTime] = useState("8:00 AM");

  console.log(active, "Selected date that you can send while creating event");

  useEffect(() => {
    setValue(date.getMonth());
  }, []);

  useEffect(() => {
    if (isiboAdded) {
      setUmutwe("");
      setAhoKizabera("");
      setAmande("");
      setIkizakorwa("");
      navigation.navigate("Home");
    }
  }, [isiboAdded]);

  useEffect(() => {
    setMonth(value);
  }, [value]);

  useEffect(() => {
    axios
      .get(`https://umudugudu-backend.onrender.com/api/calendar/month/${months[month]}`)
      .then((res) => {
        console.log(res.data[months[month]]);
        setDates(res.data[months[month]]);
      });
              
  }, [month]);

  const handleAddIsiboEvent = () => {
    const data = {
      title: umutwe,
      description: ikizakorwa,
      time,
      date: active,
      venue: ahoKizabera,
      amande,
    };
    console.log(data);
    dispatch(AddIsiboEvent(data));
  };


  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#F2F1F1" />
      <ScrollView style={styles.homeContainer}>
        <View>
          <Text style={styles.names}>Gushyiramo igikorwa cy'Isibo yawe</Text>
        </View>
        <View>
          <DropDownPicker
            searchable={true}
            open={open}
            placeholder="Month"
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            zIndex={10}
            listMode="MODAL"
            dropDownDirection="AUTO"
            setItems={setItems}
            placeholderStyle={{
              fontWeight: "bold",
              fontFamily: "Poppins_500Medium",
              color: "#0E5A64",
            }}
            style={{
              width: 140,
              borderWidth: 0,
              borderRadius: 0,
              backgroundColor: "transparent",
            }}
            containerStyle={{
              height: 40,
              width: 140,
            }}
            labelStyle={{
              fontWeight: "bold",
              fontFamily: "Poppins_500Medium",
              color: "#0E5A64",
            }}
          />
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {dates.map((week) => {
            return week.map((day, index) => {
              if (day !== 0) {
                return (
                  <TouchableOpacity
                    onPress={() => setActive(`${day}/${month + 1}/${year}`)}
                    style={
                      active == `${day}/${month + 1}/${year}`
                        ? styles.activeDate
                        : styles.subContainer
                    }
                  >
                    <Text style={styles.day}>{day}</Text>
                    <Text style={styles.date}>{days[index]}</Text>
                  </TouchableOpacity>
                );
              }
            });
          })}
        </ScrollView>

        <Text style={styles.texts}>Umutwe</Text>
        <LoginTextInput placeholder="Shyiramo Igikorwa" value={umutwe} Onchange={(text) => setUmutwe(text)} />
        <Text style={styles.texts}>Aho kizabera</Text>
        <LoginTextInput placeholder="Shyiramo aho Igikorwa kizabera" value={ahoKizabera} Onchange={(text) => setAhoKizabera(text)} />
        <Text style={styles.texts}>Amande</Text>
        <LoginTextInput placeholder="Shyiramo Amande azacibwa utazitabira" value={amande} Onchange={(text) => setAmande(text)} />
        <Text style={styles.texts}>Ikizakorwa</Text>

        <LoginTextInput
          customHeight={80}
          placeholder="Shyiramo Amande azacibwa utazitabira"
          value={ikizakorwa}
          Onchange={(text) => setIkizakorwa(text)}
        />
        <View style={styles.btn}>
          <Text style={styles.text}>
            *Iki gikorwa kirajya muby'umudugudu muyoboye
          </Text>

          <Button loading={isLoading} text="Emeza igikorwa" customMargin={5} action={handleAddIsiboEvent} />
        </View>
      </ScrollView >
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
    fontSize: "16@s",
    fontFamily: "Poppins_500Medium",
    marginVertical: "1@s",
    color: "#2E3A59",
  },
  textInfo: {
    textAlign: "center",
    marginVertical: "10@s",
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
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: 150,
    height: 100,
    position: "absolute",
    right: "1@s",
    marginTop: "28@s",
  },
  menuItem: {
    fontSize: 16,
    color: "#0E5A64",
    marginBottom: "5@s",
    paddingVertical: "5@s",
  },
  calendar: {
    flexDirection: "row",
    marginBottom: "10@s",
  },
  activeDate: {
    flexDirection: "column",
    paddingHorizontal: "15@s",
    paddingVertical: "15@s",
    borderRadius: "30@s",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E5A64",
  },
  subContainer: {
    flexDirection: "column",
    marginHorizontal: "10@s",
    marginVertical: "10@s",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    // marginLeft: "7@s",
    fontFamily: "Poppins_500Medium",
  },
  homeContainer: {
    paddingHorizontal: "10@s",
  },
  day: {
    fontFamily: "Poppins_500Medium",
  },
  month: {
    fontFamily: "Poppins_500Medium",
    color: "#0E5A64",
  },
  scroll: {
    flexDirection: "column",
    marginTop: "10@s",
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
  },

  text: {
    color: "#2E3A59",
    fontFamily: "Poppins_500Medium",
    fontWeight: "600",
  },
});
