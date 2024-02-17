import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RoundedButton } from "../Components/Button";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export const EventDetails = (props) => {
  const [activityTitle, setActivityTitle] = useState("");
  const [activityStatus, setActivityStatus] = useState("");
  const { item } = props.route.params;
  const height = Dimensions.get("window").height;
  const { params } = useRoute();
  const [isDisabled, setDisabled] = useState(true);
  const [token, setToken] = useState("");
  const [loading, setIsLoading] = useState(false);
  console.log(params.status, "params......................");
  console.log(item, "items");

  const [done, setdone] = useState(false);
  const [ibizakorwa, setIbizakorwa] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation();
  const [updatedActivity, setUpdatedActivity] = useState(item.activities);

  console.log(item, "itemm");
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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `https://umudugudu-backend.onrender.com/api/event/delete/${item._id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "deleted ");
      setIsDeleting(false);
      navigation.goBack(); // go back to the previous screen
    } catch (err) {
      console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrr");
      setIsDeleting(false);
    }
  };
  console.log(activityStatus, "status");
  console.log(activityTitle, "title");

  const handleStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://umudugudu-backend.onrender.com/api/event/activityStatus/${item._id}`,
        {
          activities: updatedActivity,
        },

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "activities activities");
      setIsLoading(false);
      alert("Guhindura ibikorwa byagenze neza");
    } catch (err) {
      alert("Guhindura ibikorwa biranzw");
    }
  };

  console.log(updatedActivity, "activity");

  const handleToggleActivity = (activity) => {
    const updatedActivityList = updatedActivity.map((item) => {
      if (item.activityTitle === activity.activityTitle) {
        return {
          ...item,
          status: item.status ? "" : "completed", // toggle the status of the selected activity
        };
      } else {
        return item;
      }
    });

    setUpdatedActivity(updatedActivityList);
  };

  {
    loading ? (
      <ActivityIndicator
        style={{
          height: 100,
        }}
        size="large"
        color="#0E5A64"
      />
    ) : null;
  }
  {
  }
  return (
    <SafeAreaView>
      <ScrollView style={{ height: height }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity></TouchableOpacity>
            <AntDesign
              name="delete"
              size={27}
              color="red"
              style={{ marginLeft: 50 }}
              onPress={handleDelete}
            ></AntDesign>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.dateHeader}>Itariki: </Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.dateHeader}>Ahantu: </Text>
            <Text style={styles.date}>{item.venue}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <RoundedButton
              text="Ubwitabire"
              action={() =>
                props.navigation.navigate("Ubwitabire", { item: item })
              }
            />

            <RoundedButton
              text="Abitabiriye"
              action={() =>
                props.navigation.navigate("abitabiriye", { item: item })
              }
            />

            <RoundedButton
              text="Raporo"
              action={() => props.navigation.navigate("Raporo", { item: item })}
            />
          </View>
          <View>
            <Text style={styles.title}> Raporo</Text>
            <Text style={styles.dateHeader}>
              Umutwe wa raporo:{item.report.reportTitle}{" "}
            </Text>
            <Text style={styles.dateHeader}>
              Ibyavuzwe muri raporo:{item.report.reportBody}{" "}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Umwanzuro wa raporo:{item.report.conclusion}{" "}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.title}> Ibizakorwa</Text>
            <View>
              {updatedActivity.map((activity, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <MaterialIcons
                    name={
                      activity.status ? "check-box" : "check-box-outline-blank"
                    }
                    size={30}
                    color="#0E5A64"
                    onPress={() => handleToggleActivity(activity)}
                  />
                  <ScrollView>
                    <Text>{activity.activityTitle}</Text>
                  </ScrollView>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Text
          style={{
            backgroundColor: "#0E5A64",
            padding: 15,
            alignSelf: "center",
            color: "white",
            borderRadius: 20,
            width: 100,
            paddingLeft: 30,
            fontWeight: "bold",
            marginBottom: 60
          }}
          onPress={handleStatus}
        >
          Emeza
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  dateHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: "16@s",
  },
  title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "18@s",
    marginLeft: "100@s",
    color: "#2E3A59",
    fontWeight: "800",
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: "Poppins_500Medium",
  },
  date: {
    fontSize: "16@s",
    marginBottom: 16,
    fontFamily: "Poppins_500Medium",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
