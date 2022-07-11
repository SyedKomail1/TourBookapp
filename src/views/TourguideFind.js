import React from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
//import { RadioButton, Text } from "react-native-paper";
import Button from "../../components/Button";

import COLORS from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
//import TourGuide from './TourGuide';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

var radio_props = [
  { label: "Search by Place", value: 0 },
  { label: "Search by Username", value: 1 },
];

1;
const TourguideFind = ({ navigation }) => {
  const [value, setValue] = React.useState("first");

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", color: COLORS.black }}
    >
      <View style={{ marginTop: 20 }}>
        <View style={style.searchInputContainer}>
          <Ionicons name="search" size={30} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 }}
          />
        </View>
      </View>

      <View style={{ margin: 20 }}>
        <RadioForm
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          radio_props={radio_props}
          idSeparator=","
          buttonColor={COLORS.primary}
          buttonSize={10}
          radioStyle={{ margin: 20 }}
          buttonWrapStyle={{ margin: 20 }}
          borderWidth={7}
          buttonInnerColor={"#e74c3c"}
          animation={true}
          onPress={(value) => {}}
          labelStyle={{
            fontSize: 20,
            fontWeight: "bold",
            color: COLORS.black,
            marginRight: 10,
          }}
          labelWrapStyle={{}}
          labelColor={COLORS.primary}
        />
      </View>

      <Button
        title="Find"
        onPress={() => navigation.navigate("TourguideFind")}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 320,
    width: "100%",
    borderBottomLeftRadius: 80,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
  indicatorContainer: {
    height: 20,
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
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
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
export default TourguideFind;
