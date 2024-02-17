import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const MuturageReport = ({ route, navigation }) => {
  const [userToken, setUserToken] = useState();
  const [eventReport] = useState({ ...route.params.report });
  const [eventActivities] = useState({ ...route.params.activities });

  console.log(eventReport, "report..................................");
  console.log(
    eventActivities,
    "yoooooooooooooooooooooooooo"
  );

  // if(props.route.params){
  // const {report } = props.route.params ;
  // setEventReport(report);
  // console.log(report,"itemuuuuuuuuuuuuuuuu");
  // }
  // const {item} = props.route.paramsp
  return (
    <SafeAreaView>
      <View style={styles.main}>
        <ScrollView>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={30}
            color="#0E5A64"
          />
          <View style={styles.container}>
            <Text style={styles.headText}>RAPORO Y'IGIKORWA</Text>
            <View>
              {Object.keys(eventReport).length === 0 ? (
                <View>
                  <Text style={styles.noReport}>Nta raporo yari yakorwa</Text>
                </View>
              ) : (
                <View style={styles.mainContainer}>
                  <View style={styles.ContentTextsAlign}>
                    <Text style={styles.mainTexts}>Title:</Text>
                    <Text style={styles.texts}>{eventReport.reportTitle}</Text>
                  </View>
                  <View style={styles.ContentTextsAlign}>
                    <Text style={styles.mainTexts}>Body:</Text>
                    <Text style={styles.texts}>
                      {eventReport && eventReport.reportBody}
                    </Text>
                  </View>
                  <View style={styles.ContentTextsAlign}>
                    <Text style={styles.mainTexts}>Conclusion:</Text>
                    <Text style={styles.texts}>
                      {eventReport && eventReport.conclusion}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", marginVertical: 30 }}>
                    <Text>IBIZAKORWA</Text>
                    <View style={{ marginTop: 20 }}>
                      <View style={{ flexDirection: "column" }}>
                        {Object.values(eventActivities).map(
                          (activity, index) => (
                            <View style={styles.activitiesAlign} key={index}>
                              {activity.status == "completed" ? (
                                <>
                                  <MaterialIcons
                                    name="check-box"
                                    size={24}
                                    color="white"
                                  />
                                </>
                              ) : (
                                <>
                                  <MaterialIcons
                                    name="check-box-outline-blank"
                                    size={24}
                                    color="white"
                                  />
                                </>
                              )}
                              <Text>{activity.activityTitle} </Text>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
            {/* {console.log(
              Object.keys(eventReport).length,
              
            )} */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  main: {
    margin: "20@s",
  },
  container: {
    marginVertical: "20@s",
    backgroundColor: "#F2F1F1",
    backgroundColor: "#0E5A64",
    paddingHorizontal: "15@s",
    borderRadius: "20@s",
  },
  activitiesAlign : {
    flexDirection:'row',
    paddingVertical:'10@s'
  },
  headText: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "25@s",
    color: "white",
    alignSelf: "center",
  },
  mainContainer: {
    marginVertical: "30@s",
  },
  ContentTextsAlign: {
    flexDirection: "row",
  },
  mainTexts: {
    fontFamily: "Poppins_700Bold",
    fontSize: "17@s",
    color: "white",
    alignSelf: "center",
  },
  texts: {
    fontSize: "12@s",
    fontFamily: "Poppins_500Medium",
    width: "250@s",
    // backgroundColor:'red',
    alignSelf: "center",
    marginHorizontal: "5@s",
    color: "white",
  },
  noReport: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: "15@s",
    alignSelf: "center",
    marginTop: "40@s",
  },
});
