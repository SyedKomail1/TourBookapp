import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../consts/colors";

const Started = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/onboardImage333.jpg")}
      >
        <View style={style.details}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Register</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("HomeScreen2")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Guest</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <View
              style={{
                height: 50,
                width: 120,
                backgroundColor: COLORS.white,
                marginTop: 20,
                borderRadius: 7,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Go Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: "50%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Started;
