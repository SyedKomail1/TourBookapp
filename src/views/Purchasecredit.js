import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Snackbar, Button } from "react-native-paper";
import axios from "axios";
import COLORS from "../consts/colors";
import Button1 from "../../components/Button1";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import * as SecureStore from "expo-secure-store";

const Purchasecredit = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    CardNumber: "",
    Month: "",
    Year: "",
    CVC: "",
    Amount: "",
    email: "",
    name: "",
  });

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

    if (!inputs.name) {
      handleError("Please Fill the Field", "name");
      isValid = false;
    }

    if (!inputs.email) {
      handleError("Please Fill the email", "email");
      isValid = false;
    }

    if (!inputs.CardNumber) {
      handleError("Please Fill the CardNumber", "CardNumber");
      isValid = false;
    }

    if (!inputs.Month) {
      handleError("Please Fill the Month", "Month");
      isValid = false;
    }

    if (!inputs.Year) {
      handleError("Please Fill the Year", "Year");
      isValid = false;
    }

    if (!inputs.CVC) {
      handleError("Please Fill the CVC", "CVC");
      isValid = false;
    }

    if (!inputs.Amount) {
      handleError("Please Fill the Amount", "Amount");
      isValid = false;
    }
    if (isValid) {
      addData();
    }
  };

  async function save(token, value) {
    await SecureStore.setItemAsync("token", token);
  }

  async function getValueFor(token) {
    let result = await SecureStore.getItemAsync(token);
    return result;
  }

  const addData = async (e) => {
    const cvc = inputs.CVC;
    const balance = Number(inputs.Amount);
    const year = inputs.Year;
    const cn = String(inputs.CardNumber);
    const month = inputs.Month;
    const myemail = inputs.email;
    const myname = inputs.name;
    console.log("\n called axios\n");
    console.log(inputs);
    console.log(inputs.CardNumber);
    //console.log(await AsyncStorage.getItem("accessToken"));

    // const data = {
    //   payment: {
    //     CardNumber: cn,
    //     Month: month,
    //     Year: year,
    //     CVC: cv,
    //     Amount: balance,
    //   },
    //   user: {
    //     email: myemail,
    //     name: myname,
    //   },
    // };

    console.log("\n show data \n");
    const token = await getValueFor("token");
    console.log("card ", cn);
    console.log(console.log(token));
    console.log("\n after token \n");

    axios
      .post(
        "http://tourbook-backend.herokuapp.com/api/transactions/buy",
        {
          payment: {
            CardNumber: cn,
            Month: month,
            Year: year,
            CVC: cvc,
            Amount: balance,
          },
          user: {
            email: myemail,
            name: myname,
          },
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((responce) => {
        console.log("uper");
        console.log(responce);
        // const b = responce.data.balance.toString();
        // save("balance", b);
        navigation.navigate("Success");
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
        // navigation.navigate('HomeScreen');
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

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

        <StatusBar backgroundColor="#009387" barStyle="light-content" />

        <View style={style.header6}>
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
              source={require("../../assets/travel1-01.png")}
            />
          </View>
        </View>

        <View style={style.footer}>
          <Text
            style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}
          >
            Enter the details to purchase credit
          </Text>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, color: COLORS.grey }}></Text>
            </View>

            <View style={{ flex: 1, borderColor: "#cccccc", marginLeft: 10 }}>
              <Text style={{ fontSize: 14, color: COLORS.grey }}></Text>
            </View>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => handleOnchange(text, "name")}
              onFocus={() => handleError(null, "name")}
              iconName="person"
              label="Full Name"
              placeholder="Enter Full Name"
              error={errors.name}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="mail"
              label="Email Address"
              placeholder="Enter your Email"
              error={errors.email}
            />
            <Input
              keyboardType="numeric"
              maxLength={16}
              onChangeText={(text) => handleOnchange(text, "CardNumber")}
              onFocus={() => handleError(null, "CardNumber")}
              iconName="ios-card"
              label="Cardholder Number"
              placeholder="Enter Cardholder Number"
              error={errors.CardNumber}
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: COLORS.grey }}>Month </Text>
                <Input
                  //style={{ fontSize: 12, color: COLORS.black }}
                  maxLength={2}
                  onChangeText={(text) => handleOnchange(text, "Month")}
                  onFocus={() => handleError(null, "Month")}
                  //iconName="email-outline"
                  //label="Passenger"
                  placeholder="Enter Month"
                  error={errors.Month}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1, borderColor: "#cccccc", marginLeft: 10 }}>
                <Text style={{ fontSize: 14, color: COLORS.grey }}>Year</Text>
                <Input
                  //style={{ fontSize: 14, color: COLORS.grey }}
                  maxLength={4}
                  onChangeText={(text) => handleOnchange(text, "Year")}
                  onFocus={() => handleError(null, "Year")}
                  //iconName="email-outline"
                  //label="Passenger"
                  placeholder="Enter Year"
                  error={errors.Year}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={{ fontSize: 14, color: COLORS.grey }}>CVC</Text>
            <Input
              // style={{ fontSize: 14, color: COLORS.grey }}
              maxLength={3}
              onChangeText={(text) => handleOnchange(text, "CVC")}
              onFocus={() => handleError(null, "CVC")}
              //iconName="email-outline"
              //label="Passenger"
              placeholder="Enter CVC"
              error={errors.CVC}
              keyboardType="numeric"
            />
            <Input
              // style={{ fontSize: 14, color: COLORS.grey }}
              maxLength={4}
              onChangeText={(text) => {
                handleOnchange(text, "Amount"),
                  AsyncStorage.setItem("vAmount", text);
              }}
              onFocus={() => handleError(null, "Amount")}
              //iconName="email-outline"
              //label="Passenger"
              placeholder="Enter Amount"
              error={errors.Amount}
              keyboardType="numeric"
            />
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              Click here to Purchase Credit
            </Text>

            <Button1 title="Purchase Credit" onPress={validate} />
            <Text
              onPress={() => navigation.navigate("HomeScreen")}
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            ></Text>

            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Click purchase credit to get credit and enjoy tours
            </Text>
          </View>
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
  container: {
    flex: 1,
  },
  criteriaRow: {
    flexDirection: "row",
    padding: 25,
    alignItems: "center",
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    paddingLeft: 15,
    paddingBottom: 15,
    marginBottom: 15,
    paddingTop: 15,
  },
  icon: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
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
    fontFamily: "Cochin",
    //
  },
  textPart2: {
    color: COLORS.grey,
    fontFamily: "Cochin",
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

export default Purchasecredit;
