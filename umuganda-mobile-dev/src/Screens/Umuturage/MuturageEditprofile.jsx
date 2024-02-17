import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_800ExtraBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { LoginTextInput } from "../../Components/Textfield";
import * as ImagePicker from "expo-image-picker";
import { State, TextInput } from "react-native-gesture-handler";
import { EditFields } from "../../Components/Textfield/EditFields";
import { SmallButtons } from "../../Components/Button";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editUserData } from "../../features/authSlice";
import { useNavigation } from "@react-navigation/native";
import { resetEditProfile } from "../../features/authSlice";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Avatar } from "react-native-elements";

export const MuturageEditprofile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userIdNumber, setUserIdNumber] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [userId, setUserId] = useState("");
  const { userData, userEdited } = useSelector((state) => state.auth);

  const [imageSource, setImageSource] = useState(
    require("../../../assets/girl.png")
  );
  const [selectedImage, setSelectedImage] = useState();
  const [userToken, setUserToken] = useState();
  const [userInformation, setUserInformation] = useState([]);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    setUserId(userData?._id);
  }, []);

  const handleEdit = () => {
    // const data = new FormData();
    // data.append("profile", imageSource);
    // console.log(selectedImage, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,')
    // data.append("name", userName);
    // data.append("password", userPassword);
    // data.append("profile", userProfile);
    // data.append("id", userId);
    // data.append("tel", userPhoneNumber);

    const data = {
      name: userName,
      password: userPassword,
      id: userIdNumber,
      tel: userPhoneNumber,
    }
    dispatch(editUserData(userId, data));
  };

  /// setting input fields empty and returning back to previous screen and set user edited to false
  useEffect(() => {
    if (userEdited) {
      setUserPhoneNumber("");
      setUserPassword("");
      navigation.goBack();
      dispatch(resetEditProfile());
    }
  }, [userEdited]);

  

  // const handlePickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(
  //     result.assets,
  //     "/////////////////////////////////////////////////////////////////"
  //   );
  //   if (!result.canceled) {
  //     console.log(result);
  //     const imageAsset = result;
  //     setImageSource({ uri: imageAsset });
  //     setSelectedImage(result.assets[0]);
  //     console.log(result, "poiuytrertyuiopoiuytrrtyui");
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //     }
  //   })();
  // }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          </TouchableWithoutFeedback>
          <View style={styles.main}>
            <TouchableOpacity>
          <Avatar  rounded size={100}  title="MW" containerStyle={{backgroundColor:'#0E5A64', alignSelf:'center', marginTop:40,}} />
            </TouchableOpacity>
            <View style={styles.information}>
              <EditFields
                placeholder="Amazina"
                Onchange={(text) => setUserName(text)}
              />
              <EditFields
                placeholder="Ijambo banga"
                Onchange={(text) => setUserPassword(text)}
              />
              <EditFields
                placeholder="Nimero y' Indangamuntu"
                Onchange={(text) => setUserIdNumber(text)}
              />
              <EditFields
                placeholder="Nimero ya Telefoni"
                Onchange={(text) => setUserPhoneNumber(text)}
              />
            </View>
            <SmallButtons
            
              action={handleEdit}
              text={"Emeza Umwirondoro"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "10@s",
  },
  main: {
    marginTop: "10@s",
  },
  information: {
    marginTop: "120@s",
  },
});
