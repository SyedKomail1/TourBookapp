import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Input from "../../components/Input";

const DetailsScreen1 = ({ navigation, route }) => {
  const post = route.params;
  const [inputs, setInputs] = React.useState({
    seats: 0,
    fullname: "",
  });
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const validate = () => {
    console.log("vv");
    Keyboard.dismiss();
    let isValid = true;

    if (inputs.seats <= 0) {
      handleError("Please input seats", "seats");
      isValid = false;
    }
    if (inputs.seats > post.seats) {
      handleError(`seats should be less than ${post.seats}`, "seats");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("Userprofile1", {
        totalPrice: totalPrice,
        tourId: post._id,
        seats: inputs.seats,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />

        <ImageBackground
          style={style.cardImage}
          source={{ uri: post.tourpics[0] }}
        >
          <View style={style.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.white}
              onPress={navigation.goBack}
            />
            <Icon name="more-vert" size={28} color={COLORS.white} />
          </View>
          <View style={style.imageDetails}>
            <Text
              style={{
                width: "70%",
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.white,
                marginBottom: 20,
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              {post.name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={30} color={COLORS.white} />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 20,
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                5.0
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <FontAwesome5
              name="map-marker-alt"
              size={28}
              color={COLORS.primary}
              onPress={() => showMode1("date")}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Icon name="person" size={28} color={COLORS.black} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              {post.seats} seats available
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              Tour Starting Day : {post.startDate}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              To : {post.source.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              From : {post.destination.name}
            </Text>
          </View>

          <Text
            style={{
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 5,
              color: COLORS.black,
            }}
          >
            About the trip :
          </Text>

          <Text
            style={{
              marginTop: 20,
              marginLeft: 5,

              marginBottom: -20,
              fontSize: 15,
              color: COLORS.black,
            }}
          >
            {post.description}
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Input
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              handleOnchange(text, "seats");
              setTotalPrice(text * post.price);
            }}
            onFocus={() => handleError(null, "seats")}
            //iconName="account-outline"
            label="Enter No of Seats"
            placeholder="No of seats"
            error={errors.seats}
          />
        </View>
        <View style={style.footer}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Rs. {inputs.seats * post.price}
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => validate()}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  iconContainer1: {
    backgroundColor: "red",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
});

export default DetailsScreen1;
