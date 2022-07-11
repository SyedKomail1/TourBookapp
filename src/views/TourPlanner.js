import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const TourPlanner = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    destination: "",
    fullname: "",
    stay: "",
    passenger: "",
    end: "",
    date: "",
    input: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.destination) {
      handleError("Please input Destination", "destination");
      isValid = false;
    }

    if (!inputs.start) {
      handleError("Please input Start Location", "start");
      isValid = false;
    }

    if (!inputs.date) {
      handleError("Please input Date", "date");
      isValid = false;
    }

    if (!inputs.pace) {
      handleError("Please input the pace of trip", "pace");
      isValid = false;
    }

    if (!inputs.passenger) {
      handleError("Please input the passenger", "passenger");
      isValid = false;
    }

    if (!inputs.end) {
      handleError("Please input End Location", "end");
      isValid = false;
    }

    if (!inputs.input) {
      handleError("Please input the field", "input");
      isValid = false;
    }

    if (isValid) {
      register();
    }
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

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Tour Planner
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text> */}
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "destination")}
            onFocus={() => handleError(null, "destination")}
            //iconName="email-outline"
            label="Destination"
            placeholder="Enter Destination"
            error={errors.destination}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "start")}
            onFocus={() => handleError(null, "start")}
            //iconName="account-outline"
            label="Start Location"
            placeholder="Enter your Start Location"
            error={errors.start}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "end")}
            onFocus={() => handleError(null, "end")}
            //iconName="account-outline"
            label="End Location"
            placeholder="Enter your End Location"
            error={errors.end}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "pace")}
            onFocus={() => handleError(null, "pace")}
            //iconName="account-outline"
            label="Trip Pace"
            placeholder="Enter your Trip Pace"
            error={errors.pace}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "passenger")}
            onFocus={() => handleError(null, "passenger")}
            //iconName="email-outline"
            label="Passenger"
            placeholder="Enter Number of Passenger"
            error={errors.passenger}
          />
          <View style={{ marginBottom: 10 }}></View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Popular" value="java" />
                <Picker.Item label="Balance" value="js" />
              </Picker>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Cultural" value="java" />
                <Picker.Item label="Religious" value="js" />
              </Picker>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Historical " value="java" />
                <Picker.Item label="Relaxing" value="js" />
              </Picker>
            </View>
          </View>

          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}

          <Button title="Validate" onPress={validate} />

          <Button
            title="Create"
            onPress={() => navigation.navigate("Tourplannedpage")}
          />

          <Text
            style={{
              color: COLORS.grey,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Click create to get the tour created and visible to Public
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourPlanner;
