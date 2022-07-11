import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import COLORS from "../consts/colors";
import Button1 from "../../components/Button1";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Snackbar, Button } from "react-native-paper";

import * as SecureStore from "expo-secure-store";
import { HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  // const [inputs, setInputs] = React.useState({ email: "zainharoon890@gmail.com", password: "newpass1234" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [Iserror, setIsError] = React.useState(false);

  const [error, setError] = React.useState("");
  const { height } = Dimensions.get("screen");
  const { width } = Dimensions.get("screen");

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError(" Enter Email in Correct Format ", "email");

      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  async function save(token, value) {
    const value1 = value.toString();
    await SecureStore.setItemAsync("token", token);
  }

  async function saveEmail(value) {
    const value1 = value.toString();
    await SecureStore.setItemAsync("myemail", value);
  }

  async function saveid(value) {
    const value1 = value.toString();
    await SecureStore.setItemAsync("myid", value);
  }

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }

  const login = async () => {
    console.log("no error");
    setLoading(true);
    console.log(inputs.email, inputs.password);
    axios
      .post("http://tourbook-backend.herokuapp.com/api/users/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then(async (res) => {
        console.log(res.error);

        console.log("token here");
        console.log(res.data.data.email, "my email");
        console.log(res.data.data.id, "my id");

        console.log(res.data.data.balance);

        await save(res.data.data.token, res.data.data);
        await saveEmail(res.data.data.email);
        await saveid(res.data.data.id);

        // await saveBalance(res.data.data.balance, res.data.data);

        console.log("token showing here");
        const token = await getValueFor("token");
        // const balance = await getValueFor("balance");

        console.log(token);
        // console.log(balance);
        console.log("token saved");

        if (res.status === 200) {
          console.log(res);

          let ress = res.data;
          console.log(ress.message);

          setLoading(false);

          console.log(res.data.data.role, "role");
          if (res.data.data.role == "tourist") {
            console.log("your status is ", res.status);
            navigation.navigate("TabNavigation");
          }
          if (res.data.data.role == "vendor") {
            console.log("your status is ", res.status);
            navigation.navigate("TabNavigation1");
          }

          //TabNavigation1
          if (res.data.data.role == "tourguide") {
            console.log("your status is ", res.status);
            navigation.navigate("TabNavigation1");
          }
          if (res.data.data.role == "admin") {
            console.log("your status is ", res.status);
            navigation.navigate("TabNavigation2");
          }
          //TabNavigation2
        } else {
          console.log(res.data.message, "error msg");
          Alert.alert(errors.message);

          setTimeout(async () => {
            Alert.alert("Error", "helo");
          }, 3000);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("catch error error");

        console.error(err);
        console.log(err.response.data.message);
        setError(err.response.data.message);

        setIsError(true);
      });
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />

        <View style={style.header6}>
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
              source={require("../../assets/travel1-01.png")}
            />
          </View>
        </View>

        <View style={style.footer}>
          <Loader visible={loading} />
          {/* {Iserror ? (
            <Text
              style={{
                color: COLORS.red,
                fontSize: 18,
                marginVertical: 10,
                marginLeft: 10,
              }}
            >
              Error:{error}
            </Text>
          ) : (
            <></>
          )} */}

          <View style={{ paddingHorizontal: 20, marginTop: -10 }}>
            <Text
              style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}
            >
              Log In
            </Text>

            <Text
              style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}
            >
              Enter Your Details to Login
            </Text>

            <View style={{ marginVertical: 20 }}>
              <View style={{ marginhorizontal: 30 }}>
                <Input
                  onChangeText={(text) => handleOnchange(text, "email")}
                  onFocus={() => handleError(null, "email")}
                  iconName="mail"
                  label="Email"
                  placeholder="Enter your email address"
                  error={errors.email}
                />
              </View>
              <Input
                onChangeText={(text) => handleOnchange(text, "password")}
                onFocus={() => handleError(null, "password")}
                iconName="md-lock-closed"
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                password
              />

              <Text
                onPress={() => navigation.navigate("ForgetPassword")}
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: 16,
                }}
              >
                Forget Password
              </Text>

              <Button1 title="Log In" onPress={validate} />

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  Don't have account?
                </Text>

                <Text
                  onPress={() => navigation.navigate("RegisterScreen")}
                  style={{
                    color: COLORS.primary,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
                    marginLeft: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Register
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-back-ios" size={20} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Go back</Text>
            </View>
          </TouchableOpacity>
          {Iserror ? (
            <View
              style={{
                marginLeft: 100,
                width: 200,
                height: 100,
                marginBottom: -30,
                marginTop: 10,
              }}
            >
              <Button
                mode="contained"
                labelStyle={{ fontSize: 15 }}
                color="firebrick"
                onPress={onToggleSnackBar}
              >
                {visible ? "Hide" : "Check Error"}
              </Button>
            </View>
          ) : (
            <></>
          )}
          {Iserror ? (
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Undo",
                onPress: () => {
                  // Do something
                },
              }}
            >
              Error:{error}
            </Snackbar>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header6: {
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  header1: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: COLORS.primary,
  },

  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 20,
  },
  textPart2: {
    color: COLORS.grey,

    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  inputContainer: {
    height: 60,
    width: 400,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    margin: 5,
  },
  categoryContainer: {
    marginTop: 60,
    alignItems: "center",

    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    marginRight: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#00B761",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: COLORS.white,
  },

  footer: {
    marginTop: -220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    elevation: 30,

    //paddingHorizontal: 30
  },
  upView: {
    flex: 2,
    width: "100%",
    marginBottom: 230,
    //backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
