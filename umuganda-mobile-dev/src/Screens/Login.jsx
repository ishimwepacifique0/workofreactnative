
import { TouchableOpacity, Text, View, ScrollView, Image, Dimensions, Pressable, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScaledSheet } from 'react-native-size-matters'
import { StatusBar } from 'expo-status-bar';
import { LoginTextInput } from '../Components/Textfield';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Button } from '../Components/Button';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { LoginUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const Login = ({ navigation }) => {

  const isLoading = useSelector(state => state.auth.isLoading)
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(true)
  const dispatch = useDispatch()

  const handleLogin = () => {
    const data = {
      tel: tel,
      password: password
    };
    if (data.tel === '') {
      alert('Shyiramo nimero');
      return;
    }
    if (data.password === '') {
      alert('Shyiramo ijambobanga')
      return;
    }
    console.log(data, "str")
    dispatch(LoginUser(data))
  }

  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#0E5A64" />
      <ScrollView>
        <View style={styles.Container}>
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/logo.png")}
            />
          </View>
          <Text style={styles.head1}>Umuganda</Text>
     <KeyboardAvoidingView>

    
          <View style={styles.main}>
            <Text style={styles.texts}>Nomero ya terefoni</Text>
            <LoginTextInput
              Onchange={(text) => setTel(text)}
              placeholder={"Shyiramo nomero ya terefoni"}
              icon={<MaterialIcons name="contact-page" size={23} color="black" />}
            />
            <Text style={styles.texts}>Ijambo ry' Ibanga</Text>
            <LoginTextInput
              Onchange={(text) => setPassword(text)}
              placeholder={"Ijambo ry'ibanga"}
              secureTextEntry={viewPassword}
              icon={
                <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
                  <FontAwesome name="eye" size={23} color="black" />
                </TouchableOpacity>
              }
            />
            <View style={{
              marginVertical: 10,
            }}></View>
            <Button loading={isLoading} text={"Injira muri konti"} action={handleLogin} />
            <View style={styles.forgotpswd}>
              <Pressable>
                <Text style={styles.forgotPswddTexts}>
                  Wibagiwe ijambo banga?
                </Text>
              </Pressable>
              <Text style={styles.forgotPswddText}>Kanda hano</Text>
            </View>
          </View>
             </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = ScaledSheet.create({
  Container: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#0E5A64",
    height: height,
    width: width,
  },
  image: {
    width: "100@s",
    height: "109@s",
    alignSelf: "center",
    marginTop: "40@s",
  },
  head1: {
    fontFamily: "Poppins_500Medium",
    alignSelf: "center",
    fontSize: "20@s",
    fontWeight: "bold",
    paddingVertical: "10@s",
    color: "white",
  },
  main: {
    borderRadius: "20@s",
    backgroundColor: "#ffffff",
    height: height,
    paddingVertical: "10@s",
    marginTop: "90@s",
    paddingTop: "50@s"
  },
  texts: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    marginLeft: "15@s",
    color: "#2E3A59",

  },
  forgotpswd: {
    flexDirection: "row",
    margin: "15@s",
    alignSelf: "center",
  },
  forgotPswddTexts: {
    fontSize: "14@s",
    fontFamily: "Poppins_500Medium",
  },
  forgotPswddText: {
    color: "#0E5A64",
    fontFamily: "Poppins_500Medium",
    fontSize: "16@s",
  },
});
