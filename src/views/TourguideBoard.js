import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import COLORS from "../consts/colors";
import Button from "../../components/Button";

import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
//import TourGuide from './TourGuide';
const TourguideBoard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      {/* Onboarding Image */}
      <Image
        source={require("../../assets/Tourguideboard.jpg")}
        style={style.image}
      />

      {/* Indicator container */}
      <View style={style.indicatorContainer}>
        <View style={style.indicator} />
        <View style={style.indicator} />
        <View style={[style.indicator, style.indicatorActive]} />
      </View>

      {/* Title and text container */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Title container */}
        <View>
          <Text style={style.title}>Custom Tour</Text>
        </View>

        {/* Text container */}
        <View style={{ margin: 5 }}>
          <Text style={style.textStyle}>
            Are you looking for a perfect tour, as per your wish
          </Text>
          <Text style={style.textStyle}>You are at right place!!!</Text>
        </View>
      </View>

      {/* Button container */}

      {/* button */}

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ margin: 25, width: 400 }}>
          <Button
            title="Go to Custom Tour Page"
            onPress={() => navigation.navigate("Customtour")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 320,
    width: "100%",
    borderBottomLeftRadius: 80,
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
  indicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    flex: 1,

    padding: 12,
    flexDirection: "row",
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 32, fontWeight: "bold" },
  textStyle: { fontSize: 16, color: COLORS.grey },
});
export default TourguideBoard;
