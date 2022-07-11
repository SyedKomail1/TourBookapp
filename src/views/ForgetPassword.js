import React from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();

    let isValid = true;
    if (!email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (isValid) {
      verifyEmail();
    }
  };

  const setVerifyCode = async (code) => {
    await AsyncStorage.setItem("code", code);
    await AsyncStorage.setItem("verifyEmail", email);
  };

  const verifyEmail = async () => {
    setLoading(true);

    await axios
      .post("http://tourbook-backend.herokuapp.com/user/forgot", { email })
      .then((res) => {
        AsyncStorage.setItem("verifyEmail", email);
        console.log(res.data.data, "is my code");
        setLoading(false);
        navigation.navigate("ForgetCode");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert.alert(console.error(err));
      });
  };

  const handleOnchange = (text) => {
    setEmail(text);
  };

  const handleError = (error) => {
    setErrors(error);
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Email Required
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Code will be Sent to your email
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text)}
            onFocus={() => handleError(null)}
            Name="mail-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors}
          />
          <Button title="Submit" onPress={() => validate()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
