import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Snackbar, Button } from "react-native-paper";
import COLORS from "../consts/colors";
import Button1 from "../../components/Button1";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fname: "",
    lname: "",
    phoneNumber: "",
    role: "",
    cnic: "",
    password: "",
    city: { _id: "", name: "Swabi" },
    country: "",
    gender: "",
  });
  const [cities, setCities] = React.useState();
  const [cityname, setCityName] = React.useState();
  // inputs.city = "626e2a64c65f4c055b64364d";

  const getCities = async () => {
    await axios
      .get("http://tourbook-backend.herokuapp.com/api/city/all")
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCities();
  }, []);

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Iserror, setIsError] = React.useState(false);

  const [error, setError] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    console.log("Start1");

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }

    if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError(" Enter Email in Correct Format ", "email");
      console.log("email wale me error hai");
      isValid = false;
    }

    if (!inputs.fname) {
      handleError("Please input firstname", "fname");
      console.log("fname wale me error hai");
      isValid = false;
    }

    if (!inputs.lname) {
      handleError("Please input lastname", "lname");
      console.log("lname wale me error hai");
      isValid = false;
    }

    if (!inputs.city) {
      handleError("Please input city", "city");
      console.log("city wale me error hai");
      isValid = false;
    }

    if (!inputs.country) {
      handleError("Please input country", "country");
      console.log("coun wale me error hai");
      isValid = false;
    }

    if (!inputs.role) {
      handleError("Please input role", "role");
      console.log("rolee wale me error hai");
      isValid = false;
    }

    if (!inputs.gender) {
      handleError("Please input gender", "gender");
      console.log("gend wale me error hai");
      isValid = false;
    }

    if (!inputs.phoneNumber) {
      handleError("Please input phone number", "phoneNumber");
      console.log("phone err2");
      isValid = false;
    }
    if (inputs.phoneNumber.length != 11) {
      handleError("Phone Number lenght is less than 11", "phoneNumber");
      console.log("phone er1", inputs.phoneNumber.length);
      isValid = false;
    }

    if (!inputs.cnic) {
      handleError("Please input cnic", "cnic");
      console.log("cnic err");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      console.log("passs err");
      isValid = false;
    }
    if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      console.log("pass err");
      isValid = false;
    }

    console.log("\n called axios1\n");
    console.log(isValid);

    if (isValid) {
      console.log("\n called axios2\n");

      addData();
    }
  };
  const addData = async (e) => {
    console.log("\n called axios\n");

    console.log(inputs);

    axios
      .post("https://tourbook-backend.herokuapp.com/api/users/signup", {
        email: inputs.email,
        password: inputs.password,
        phoneNumber: inputs.phoneNumber,
        fname: inputs.fname,
        lname: inputs.lname,
        city: inputs.city._id,
        country: inputs.country,
        role: inputs.role,
      })
      .then((responce) => {
        if (responce.status === 200) {
          console.log(inputs);
          console.log("User Added Successfully!");
          register();
          console.log("Done axios");
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

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
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

          <Text
            style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}
          >
            Register
          </Text>
          <Text
            style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}
          >
            Enter Your Details to Register
          </Text>
          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              Name="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "fname")}
              onFocus={() => handleError(null, "fname")}
              Name="account-outline"
              label="First Name"
              placeholder="Enter your firstname"
              error={errors.fname}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "lname")}
              onFocus={() => handleError(null, "lname")}
              Name="account-outline"
              label="Last Name"
              placeholder="Enter your lastname"
              error={errors.lname}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "gender")}
              onFocus={() => handleError(null, "gender")}
              //Name="account-outline"
              label="Gender"
              placeholder="Enter your Gender"
              error={errors.gender}
            />

            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={{
                color: COLORS.primary,
                textAlign: "left",
                fontSize: 16,
                paddingBottom: 5,
              }}
            >
              City
            </Text>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginLeft: 7,
                  paddingTop: 3,
                  height: 60,
                  borderBottom: "1px solid",
                }}
              >
                <Picker
                  label="hello"
                  onValueChange={(itemValue) => {
                    // console.log(itemValue);
                    handleOnchange(itemValue, "city");
                    console.log(inputs.city);
                    setCityName(inputs.city.name);
                  }}
                >
                  <Input
                    label={inputs.city.name}
                    placeholder="Enter the city"
                  />

                  {cities ? (
                    cities.map((city) => (
                      <Picker.Item label={city.name} value={city} />
                    ))
                  ) : (
                    <></>
                  )}
                </Picker>
              </View>
            </View>

            <Input
              onChangeText={(text) => handleOnchange(text, "country")}
              onFocus={() => handleError(null, "country")}
              //Name="account-outline"
              label="country"
              placeholder="Enter your country"
              error={errors.country}
            />

            <Input
              keyboardType="numeric"
              onChangeText={(text) => handleOnchange(text, "cnic")}
              maxLength={13}
              onFocus={() => handleError(null, "cnic")}
              Name="phone-outline"
              label="CNIC"
              placeholder="Enter your cnic"
              error={errors.cnic}
            />

            <Input
              keyboardType="numeric"
              minLength={11}
              maxLength={11}
              onChangeText={(text) => handleOnchange(text, "phoneNumber")}
              onFocus={() => handleError(null, "phoneNumber")}
              Name="phone-outline"
              label="Phone Number"
              placeholder="Enter your phone no"
              error={errors.phoneNumber}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              Name="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "role")}
              onFocus={() => handleError(null, "role")}
              Name="account-outline"
              label="Role"
              placeholder="tourist,vendor"
              error={errors.role}
            />

            <Button1 title="Register" onPress={validate} />
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Already have account ?Login
            </Text>
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
    paddingHorizontal: 20,
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

export default RegisterScreen;
