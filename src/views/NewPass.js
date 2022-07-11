import React from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (!inputs.confirmPassword) {
      handleError("Please input ConfirmPassword", "confirmPassword");
      isValid = false;
    }
    if(inputs.password != inputs.confirmPassword){
      handleError("Confirmpassword must be same as password","confirmPassword");
      isValid = false;
    }
    if (isValid) {
      setNewPass();
    }
  };

  const removeData = async () => { await AsyncStorage.removeItem('verifyEmail');await AsyncStorage.removeItem('verifyEmail');}
  const setNewPass = async () => {
    setLoading(true);
    const email = await AsyncStorage.getItem('verifyEmail');
    const pass = inputs.password;
    console.log(email,pass);
    await axios.put("http://tourbook-backend.herokuapp.com/user/update/password", { email:email, password:pass }).then(res => {
        removeData();
        navigation.navigate("PassresetSuccess");

      }).catch((err) => {console.log(err); setLoading(false);Alert.alert(err);});

  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Enter New Password
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            Name="lock-closed-outline"
            label="Enter New Password"
            placeholder="Enter new password"
            error={errors.password}
            password
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "confirmPassword")}
            onFocus={() => handleError(null, "confirmPassword")}
            Name="lock-closed-outline"
            label="Confirm New Password"
            placeholder="Enter password"
            error={errors.confirmPassword}
            password
          />

          <Button
            title="Confirm New Password"
            onPress={() => validate()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
