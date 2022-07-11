import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";

const BudgetEstimate = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    destination: "",
    fullname: "",
    stay: "",
    passenger: "",
    vehicle: "",
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

    if (!inputs.stay) {
      handleError("Please input Stay Time", "stay");
      isValid = false;
    }

    if (!inputs.date) {
      handleError("Please input Date", "date");
      isValid = false;
    }

    if (!inputs.passenger) {
      handleError("Please input number of passenger", "passenger");
      isValid = false;
    }

    if (!inputs.vehicle) {
      handleError("Please input vehicle type", "vehicle");
      isValid = false;
    }

    if (!inputs.guide) {
      handleError("Please input guide field", "guide");
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
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Budget Estimate
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
            onChangeText={(text) => handleOnchange(text, "stay")}
            onFocus={() => handleError(null, "stay")}
            //iconName="account-outline"
            label="Stay"
            placeholder="Enter your stay time"
            error={errors.stay}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "date")}
            onFocus={() => handleError(null, "date")}
            label="Date"
            placeholder="Input Date"
            error={errors.date}
          />
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}

          <Input
            onChangeText={(text) => handleOnchange(text, "passenger")}
            onFocus={() => handleError(null, "passenger")}
            //iconName="email-outline"
            label="Passenger"
            placeholder="Enter Number of Passenger"
            error={errors.passenger}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "vehicle")}
            onFocus={() => handleError(null, "vehicle")}
            //iconName="email-outline"
            label="Vehicle Type"
            placeholder="Vehicle Type"
            error={errors.vehicle}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "guide")}
            onFocus={() => handleError(null, "guide")}
            //iconName="email-outline"
            label="Guide"
            placeholder="Need a Guide"
            error={errors.vehicle}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "input")}
            onFocus={() => handleError(null, "input")}
            //iconName="email-outline"
            label="Further Information"
            placeholder="Further Information"
            error={errors.input}
          />

          <Button title="Estimate" onPress={validate} />
          <Text
            style={{
              color: COLORS.grey,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Click estimate to get the estimation of your tour
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetEstimate;
