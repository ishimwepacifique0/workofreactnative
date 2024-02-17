import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { ScaledSheet } from "react-native-size-matters";
import axios from "axios";
import { HomeCard } from "../../Components/homeCards";
import { monthsInRwanda, months, days } from "../../utils/constants";
import { getItemAsync } from "expo-secure-store";
import { color } from "react-native-elements/dist/helpers";
import { useSelector } from "react-redux";

const height = Dimensions.get("window").height;

export const Village = ({ navigation }) => {
  const eventAdded = useSelector((state) => state.umuduguduEvent.eventRefresh);
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
  const [userToken, setUserToken] = useState();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  console.log(eventAdded, "eventAdded");

  useEffect(() => {
    getItemAsync("token")
      .then((response) => {
        setUserToken(response);
      })
      .catch((error) => console.log(error));
  }, []);


  const getActivity = async () => {
    setLoading(true)
    axios({
      method: "get",
      url: "https://umudugudu-backend.onrender.com/api/event/umudugudu/all",
      headers: {
        token: `Bearer ${userToken}`,
      },
    }).then((response) => {
      setActivity(response.data.data);
      console.log(activity, ' Umudugudu Event')
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  };


  useEffect(() => {
    if (userToken) {
      getActivity();
    }
  }, [userToken, eventAdded]);

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
        // console.log(res.data[months[month]]);
        setDates(res.data[months[month]]);
      });
  }, [month]);

  return (
    <SafeAreaView>



      <View style={{ height: '100%' }}>
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
            style={styles.calendarView}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* {dates.map((week) => {
                return week.map((day, index) => {
                  if (day !== 0) {
                    return (
                      <TouchableOpacity
                        key={index}
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
          {loading ? (
            <ActivityIndicator size="large" color="#0E5A64" />
          ) : null}
          <ScrollView style={styles.scroll}>
            {activity.map((item, index) => {
              return (
                <HomeCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  place={item.venue}
                  action={"Fungura"}
                  igihe={item.time}
                  category={item.category}
                  Onchange={() =>
                    navigation.navigate("EventDetails", { item })
                  }
                />
              );
            })}
          </ScrollView>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  calendar: {
    flexDirection: "row",
    marginBottom: "10@s",
  },
  calendarView: {
    height: "100@vs",
  },
  activeDate: {
    flexDirection: "column",
    paddingHorizontal: "15@s",
    paddingVertical: "15@s",
    borderRadius: "30@s",
    height: "75@vs",
    color: "#fff",
    alignItems: "center",
    backgroundColor: "#0E5A64",
  },
  subContainer: {
    flexDirection: "column",
    marginHorizontal: "10@s",
    marginVertical: "10@s",
    // justifyContent: "center",
    alignItems: "center",
  },
  date: {
    // marginLeft: "7@s",
    fontFamily: "Poppins_500Medium",
  },
  homeContainer: {
    paddingHorizontal: "10@s",
    maxHeight: "500@s",
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
    marginTop: '-80@vs'
  },
});
