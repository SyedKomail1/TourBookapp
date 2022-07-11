import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge, Button } from "react-native-paper";

import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import COLORS from "../consts/colors";
import axios from "axios";

import Category from "./Category.js";
import Category1 from "./Category1.js";

import Button1 from "../../components/Button1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("screen");

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;
const TgHomeScreen = ({ navigation }) => {
  const categoryIcons = [
    <MaterialIcons
      name="tour"
      size={35}
      color={COLORS.primary}
      onPress={() => navigation.navigate("TopToursScreen1")}
    />,

    <Fontisto
      name="persons"
      size={25}
      color={COLORS.primary}
      onPress={() => navigation.navigate("TourguideBoard")}
    />,
  ];

  const [readNotifications, setReadNotifications] = useState();
  const [unReadNotifications, setUnReadNotifications] = useState();

  const [totalUnRead, setTotalUnRead] = useState();
  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }

  const handleChat = async () => {
    const token = await getValueFor("token");
    const email = await getValueFor("myemail");
    navigation.navigate("UserProfile45", {
      token: token,
      email: email,
    });
  };
  useEffect(async () => {
    const token = await getValueFor("token");
    const res = await axios.get(
      "http://tourbook-backend.herokuapp.com/api/notifications/mine",
      { headers: { "x-auth-token": token } }
    );

    // console.log("notifications", res.data.data);
    setReadNotifications(
      res?.data?.data?.filter((item) => item.isRead === true)
    );
    setUnReadNotifications(
      res?.data?.data?.filter((item) => item.isRead === false)
    );
    setTotalUnRead(
      res?.data?.data?.filter((item) => item.isRead === false)?.length
    );
  }, []);

  // const Card = ({ place }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       onPress={() => navigation.navigate("DetailsScreen", place)}
  //     >
  //       <ImageBackground style={style.cardImage} source={place.image}>
  //         <Text
  //           style={{
  //             color: COLORS.white,
  //             fontSize: 20,
  //             fontWeight: "bold",
  //             marginTop: 10,
  //           }}
  //         >
  //           {place.name}
  //         </Text>
  //         <View
  //           style={{
  //             flex: 1,
  //             justifyContent: "space-between",
  //             flexDirection: "row",
  //             alignItems: "flex-end",
  //           }}
  //         >
  //           <View style={{ flexDirection: "row" }}>
  //             <Ionicons name="location" size={20} color={COLORS.white} />
  //             <Text style={{ marginLeft: 5, color: COLORS.white }}>
  //               {place.location}
  //             </Text>
  //           </View>
  //           <View style={{ flexDirection: "row" }}>
  //             <Ionicons name="star" size={20} color={COLORS.white} />
  //             <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
  //           </View>
  //         </View>
  //       </ImageBackground>
  //     </TouchableOpacity>
  //   );
  // };

  const ListCategories = () => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={style.categoryContainer}>
          {categoryIcons.map((icon, index) => (
            <View key={index} style={style.iconContainer}>
              {icon}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const Card3 = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", place)}
      >
        <ImageBackground style={style.cardImage1} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const Card1 = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", place)}
      >
        <ImageBackground style={style.cardImage1} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 10 }}>
                <Ionicons name="star" size={22} color={COLORS.white} />
              </View>
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>5.0</Text>
            </View>
          </View>
          <Text style={{ color: COLORS.white, fontSize: 13 }}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  // const balance = await SecureStore.getItemAsync("balance");con
  // const setBalance = async (amount) => {
  //   const bal = await SecureStore.getItemAsync("balance");
  //   console.log("setbalance", bal);
  //   if (bal) {
  //     setAmount(bal);
  //   }
  //   return bal;
  // };

  // const [amount, setAmount] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <View style={style.header6}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Ionicons
                name="person"
                size={28}
                color={COLORS.white}
                onPress={() => navigation.navigate("Userprofile")}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: 250,
                  //elevation: 5,
                }}
              >
                <Ionicons
                  name="ios-chatbox-ellipses"
                  color={COLORS.white}
                  size={28}
                  onPress={() => handleChat()}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: 15,
                  // elevation: 5,
                }}
              >
                <Ionicons
                  name="notifications"
                  color={COLORS.white}
                  size={28}
                  onPress={() =>
                    navigation.navigate("Notification", {
                      readNotifications: readNotifications,
                      unReadNotifications: unReadNotifications,
                    })
                  }
                />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginRight: 90,
                    marginLeft: -15,

                    marginBottom: 10,

                    elevation: 5,
                  }}
                >
                  <Badge>{totalUnRead}</Badge>
                </View>

                {/* <Text>Balance {setBalance(amount)}</Text> */}
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={style.headerTitle}>Welcome</Text>
            <Text style={style.headerTitle}>Vendor</Text>
            <View style={style.inputContainer}>
              <Ionicons name="search" size={28} />
              <TextInput
                placeholder="Search place"
                style={{ color: COLORS.grey }}
              />
            </View>
          </View>

          <View style={style.footer}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.black,
                fontWeight: "bold",
                fontSize: 20,
                margin: 20,
                marginBottom: -20,
                //marginTop: 20,
              }}
            >
              Categories
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                //paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <View style={style.container}></View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginBottom: -10,
                marginRight: 10,
              }}
            >
              <View style={{ flex: 1, margin: 10 }}>
                <Button1
                  title="Created Tours"
                  onPress={() => navigation.navigate("UserProfile4")}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  borderColor: "#cccccc",
                  margin: 10,
                  width: 180,
                  // margin: 10,
                  //marginTop: 10,
                }}
              >
                <Button1
                  title="Transaction History"
                  onPress={() => navigation.navigate("VendorTransaction")}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginTop: -30,

                marginBottom: 10,
                marginRight: 10,
              }}
            >
              <View style={{ flex: 1, margin: 10 }}>
                <View style={{ flex: 1, margin: 10 }}>
                  <Button1 title="Chat" onPress={() => handleChat()} />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  borderColor: "#cccccc",
                  margin: 10,
                  width: 180,
                  // margin: 10,
                  //marginTop: 10,
                }}
              >
                <Button1
                  title="Purchase Credit"
                  onPress={() => navigation.navigate("Purchasecredit")}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginTop: -50,

                marginBottom: 10,
                marginRight: 10,
              }}
            >
              <View style={{ flex: 1, margin: 10 }}>
                <Button1
                  title="Reserved Tours Requests"
                  onPress={() => navigation.navigate("VendorReservedTour")}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  borderColor: "#cccccc",
                  margin: 10,
                  width: 180,
                  // margin: 10,
                  //marginTop: 10,
                }}
              >
                <Button1
                  title="Refund Requests"
                  onPress={() => navigation.navigate("VendorRefundrequests")}
                />
              </View>
            </View>

            {/* <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginBottom: -40,
                marginRight: 10,
              }}
            >
              <View style={{ flex: 1, margin: 10 }}>
                <Button1
                  title="Latest Tours"
                  onPress={() => navigation.navigate("TopToursScreen1")}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  borderColor: "#cccccc",
                  margin: 10,
                  width: 180,
                  // margin: 10,
                  //marginTop: 10,
                }}
              >
                <Button1
                  title="Custom Tours"
                  onPress={() => navigation.navigate("TourguideBoard")}
                />
              </View>
            </View> */}

            {/* <Text
              style={{
                fontWeight: "bold",
                color: COLORS.black,
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 20,
                marginLeft: 20,

                //marginTop: 20,
              }}
            >
              Features
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("TopToursScreen1")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: 40,

                  marginBottom: 10,
                }}
              >
                Latest Tours
              </Text>
            </TouchableOpacity>

            <Category />

            <View
              style={{
                flex: 1,
                borderColor: "#cccccc",
                // marginLeft: 10,
                marginTop: -60,
                margin: 10,
                marginBottom: -10,
                marginRight: -30,
              }}
            >
              <Button1
                title="Check Out Latest Tours"
                onPress={() => navigation.navigate("TopToursScreen1")}
              />
            </View>
           */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header6: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  header1: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: COLORS.primary,
  },

  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 20,
  },
  textPart2: {
    color: COLORS.grey,

    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  inputContainer: {
    height: 60,
    width: 400,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    margin: 5,
  },
  categoryContainer: {
    marginTop: 60,
    alignItems: "center",

    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    marginRight: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardImage: {
    height: 320,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  cardImage1: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#00B761",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: COLORS.white,
  },

  footer: {
    marginTop: 120,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 50,
    elevation: 30,

    //paddingHorizontal: 30
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    alignItems: "flex-end",
    marginRight: 190,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
export default TgHomeScreen;
