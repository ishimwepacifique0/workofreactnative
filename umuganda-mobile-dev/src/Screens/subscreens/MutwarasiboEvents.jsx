import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { ScaledSheet } from "react-native-size-matters";
import axios from "axios";
import { HomeCard } from "../../Components/homeCards";
import { monthsInRwanda, months, days } from "../../utils/constants";
import { getItemAsync } from "expo-secure-store";

const height = Dimensions.get("window").height;

export const MutwarasiboEvents = ({ navigation }) => {
  const date = new Date();
  const scrollViewRef = useRef();
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [items, setItems] = useState(monthsInRwanda);
  const [userToken, setUserToken] = useState();
  const [active, setActive] = useState(
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  );
  const [activity, setActivity] = useState([]);

  console.log(active, "Selected date that you can send while creating event");
  console.log(activity, "Activity");

  //get data for activity
  getItemAsync("token")
    .then((res) => {
      // console.log(res,)
      setUserToken(res);
    })
    .catch((err) => console.log(err));

  useEffect(() => {
    setValue(date.getMonth());
  }, []);

  useEffect(() => {
    setMonth(value);
  }, [value]);

  useEffect(() => {
    axios
      .get(
        `https://umudugudu-backend.onrender.com/api/calendar/month/${months[month]}`
      )
      .then((res) => {
        console.log(res.data[months[month]]);
        setDates(res.data[months[month]]);
      });
  }, [month]);

  //fetching activity from isibo.

  const getActivity = async () => {
    axios({
      method: "get",
      url: "https://umudugudu-backend.onrender.com/api/event/isibo/all",
      headers: {
        token: `Bearer ${userToken}`,
      },
    }).then((res) => {
      console.log(
        "-----------------------------------------kkkkkkkkkkkkkkkkkkkkkkk"
      );
      setActivity(res.data.data);
    });
  };

  useEffect(() => {
    if (userToken) {
      getActivity();
    }
  }, [userToken]);

  return (
    <SafeAreaView>
      <View style={{ height: height }}>
        <View style={styles.homeContainer}>
          <View style={styles.monthContainer}>
            {/* <DropDownPicker
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
            /> */}
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* {dates.map((week) => {
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
            })} */}
          </ScrollView>
          <ScrollView style={styles.scroll}>
            {activity.map((item, key) => {
              return (
                <HomeCard
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  place={item.venue}
                  action={"Raporo"}
                  buttonDisabled={item?.report?.length == 0 ? true : false}
                  Onchange={() => navigation.navigate("EventDetails", { item })}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
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
    maxHeight: "530@s",
  },
  day: {
    fontFamily: "Poppins_500Medium",
  },
  month: {
    fontFamily: "Poppins_500Medium",
    color: "#0E5A64",
  },
  monthContainer: {
    flexDirection: "row",
  },
  scroll: {
    flexDirection: "column",
    marginBottom: "40@s",
  },
});
