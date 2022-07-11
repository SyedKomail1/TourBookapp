import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../consts/colors";

const OnBoardScreen1 = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/onboardImage3.jpg")}
      >
        <View style={style.details}>
          <Text
            style={{
              fontFamily: "Roboto",
              color: COLORS.white,
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            Tour Book
          </Text>
          <Text
            style={{ color: COLORS.white, fontSize: 25, fontWeight: "bold" }}
          >
            Do Travelling with us
          </Text>
          <Text
            style={{
              color: COLORS.white,
              lineHeight: 25,
              marginTop: 15,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
            sem non erat vehicula dignissim. Morbi eget congue ante, feugiat.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Started")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Get Started</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TgHomeScreen")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>
                For Testing go to Home screen
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Contact")}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>For Profile </Text>
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
    //marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnBoardScreen1;
