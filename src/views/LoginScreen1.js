import React, { useState } from "react";
//import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
function LoginScreen1({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function save(token, value) {
    await SecureStore.setItemAsync(token, value);
  }

  async function getValueFor(token) {
    let result = await SecureStore.getItemAsync(token);
    return result;
  }
  const handlelogin = (e) => {
    axios
      .post("https://tourbook-backend.herokuapp.com/user/login", {
        email,
        password,
      })
      .then((res) => {
        save("token", res.data.data);
        navigation.navigate("Started");
      })

      .catch((error) => {
        console.log(error);
        alert("Invalid Credentials");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.usericon}
        //source={require("../assets/UserIcon.png")}
      />
      <Text style={styles.Signin}>Log In</Text>
      <TextInput
        style={styles.email}
        placeholder="Email"
        placeholderTextColor={"grey"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.password}
        placeholder="Password"
        placeholderTextColor={"grey"}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity onPress={() => alert("Forgot Password Pressed")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logBtn} onPress={() => handlelogin()}>
        <Text
          style={{ color: "white", fontWeight: "bold", fontFamily: "Roboto" }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.new}>
          New here?<Text style={styles.forgot}> Sign Up instead</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#170920",
  },
  background: {
    flex: 1,
  },
  email: {
    width: "90%",
    backgroundColor: "#170920",
    padding: 10,
    borderColor: "white",
    borderRadius: 2,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 2,
    color: "white",
  },
  password: {
    width: "90%",
    backgroundColor: "#170920",
    padding: 10,
    borderColor: "white",
    borderRadius: 2,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 2,
    color: "white",
  },
  Signin: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
  },
  usericon: {
    width: 100,
    height: 100,
  },
  logBtn: {
    backgroundColor: "purple",
    height: 40,
    width: 120,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  forgot: {
    alignItems: "flex-start",
    textAlign: "left",
    color: "#ff00ff",
    textDecorationLine: "underline",

    marginBottom: 15,
    marginTop: 15,
  },
  new: {
    alignItems: "flex-start",
    textAlign: "left",
    color: "#ff00ff",
    marginTop: 50,
  },
  rem: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  remtext: {
    marginTop: 20,
    color: "#ff00ff",
    alignContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 14,
  },
});

export default LoginScreen1;
