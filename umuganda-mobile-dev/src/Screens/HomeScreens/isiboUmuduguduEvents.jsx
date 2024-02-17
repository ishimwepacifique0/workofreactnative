import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { ScaledSheet } from "react-native-size-matters";
import axios from "axios";
import { HomeCard } from "../../Components/homeCards";
import { monthsInRwanda, months, days } from "../../utils/constants";

export const IsiboUmuduguEvents = () => {
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

  console.log(active, "Selected date that you can send while creating event");

  useEffect(() => {
    setValue(date.getMonth());
  }, []);

  useEffect(() => {
    setMonth(value);
  }, [value]);

  useEffect(() => {
    axios
      .get(`https://calendar-json-api.up.railway.app/month/${months[month]}`)
      .then((res) => {
        console.log(res.data[months[month]]);
        setDates(res.data[months[month]]);
      });
  }, [month]);

  return (
    <SafeAreaView>
      <View>
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
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
            <HomeCard
              title={"Kubaka iteme munsi y'urugo"}
              description={
                " Muganda wi'ki cyumweru tuzubaka iteme riri munsi yumurenge hasi yurugo  ugakomeza gato ntihazagire ubura cyangwa ngo akerewe kuza nitegeko mugihe mutaje nukubihanirwa"
              }
              date={"23/04/2023"}
              place={"Munsi yakarere"}
            />
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
    marginTop: "40@s",
  },
});
