import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getItemAsync } from "expo-secure-store";
import { ScaledSheet } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";


export const Abitabiriye = (props) => {
    const [tokenn, setToken] = useState('')
    const [havereasons, setHavereasons] = useState([])
    const [attended, setAttended] = useState([])
    const [absent, setAbsent]= useState([])

      useEffect(() => {
        getItemAsync("token")
          .then((res) => {
            setToken(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      console.log(tokenn, "tokenn");
      useEffect(() => {
        if (tokenn) {
          getList();
        }
      }, [tokenn]);
    const getList = async () => {
    try {
      const response = await axios.get(
        `https://umudugudu-backend.onrender.com/api/attendance/event/${item._id}`,
        {
          headers: {
            token: `Bearer ${tokenn}`,
          },
        }
        );
        setAbsent(response.data.notAtendedUsers);
        setAttended(response.data.attendedUsers);
        setHavereasons(response.data.haveReasons);
        
        
        console.log(response.data.haveReasons, 'have reasons');
        console.log(havereasons,'===================')
        console.log(attended,'attended users')
        console.log(absent,"absent users");
    
    } catch (err) {
      console.log(err,'++++++++++++++++');
    }}
    const { item } = props.route.params;
    console.log(item._id,'......................')
    
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.titlee}>Uko Bitabiriye</Text>
        </View>
        <Text
          style={
          styles.title}
        >
          ABASIBYE
        </Text>
        {absent.map((item, key) => {
          return (
            <ScrollView>
              <View style={styles.container}>
                <Text style={styles.name}>
                  {item.name}
                </Text>
                <Text style={styles.tel}>{item.tel}</Text>
              </View>
            </ScrollView>
          );
        })}
        <Text
          style={{
            alignSelf: "center",
            color: "#0E5A64",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          ABAFITE IMPAMVU
        </Text>
        {havereasons.map((item, key) => {
          return (
            <ScrollView>
              <View style={styles.container}>
                <Text style={{ fontWeight: "500", fontSize: 18 }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 15 }}>{item.tel}</Text>
              </View>
            </ScrollView>
          );
        })}
        <Text
          style={styles.title}
        >
          ABITABIRIYE
        </Text>
        {attended.map((item, key) => {
          return (
            <ScrollView>
              <View style={styles.container}>
                <Text style={styles.name}>
                  {item.name}
                </Text>
                <Text style={styles.name}>{item.tel}</Text>
              </View>
            </ScrollView>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  titlee: {
    fontSize: "20@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    marginLeft: "12@s",
    padding: 3,
  },
  title: {
    alignSelf: "center",
    color: "#0E5A64",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5,
  },
  tel: {
    fontSize: 15,
  },
});
