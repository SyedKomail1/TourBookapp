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
  Image,
  StyleSheet,
} from "react-native";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";

const Review = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    // email: "",
    // fullname: "",
    // phone: "",
    message: "",
  });

  const [defaultRating, setdefaultRating] = useState(3);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaultRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    // if (!inputs.email) {
    //   handleError("Please input email", "email");
    //   isValid = false;
    // } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    //   handleError("Please input a valid email", "email");
    //   isValid = false;
    // }

    // if (!inputs.fullname) {
    //   handleError("Please input fullname", "fullname");
    //   isValid = false;
    // }

    // if (!inputs.phone) {
    //   handleError("Please input phone number", "phone");
    //   isValid = false;
    // }

    if (!inputs.message) {
      handleError("Kindly write a review or else write no comments", "message");
      isValid = false;
    }

    if (isValid) {
      contact();
    }
  };

  const contact = () => {
    setLoading(true);
    Alert.alert("Error", "Review Published");

    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("HomeScreen");
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
          Kindly Rate the Order
        </Text>

        <CustomRatingBar />

        <Input
          onChangeText={(text) => handleOnchange(text, "message")}
          onFocus={() => handleError(null, "message")}
          //Name="lock-outline"
          label="Review"
          placeholder="Kindly write your review"
          error={errors.message}
        />
        <Text style={styles.textStyle}>
          {defaultRating + "/" + maxRating.length}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => alert(defaultRating)}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontSize: 20,
              color: COLORS.white,
            }}
          >
            Get Selected Value
          </Text>
        </TouchableOpacity>

        <Button title="Published Review" onPress={validate} />
        <Text
          style={{
            color: COLORS.black,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Thank You For taking your Time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    marginTop: 20,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingTop: 15,
    backgroundColor: COLORS.primary,
    height: 70,
  },
});
export default Review;
