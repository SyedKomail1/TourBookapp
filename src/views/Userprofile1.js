import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import UserAvatar from "react-native-user-avatar";

import COLORS from "../consts/colors";
import Button1 from "../../components/Button1";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar } from "react-native-paper";

const UserProfile1 = ({ route, navigation }) => {
  const { totalPrice, tourId, seats } = route.params;
  console.log(totalPrice, tourId, seats);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  async function getValueFor(myid) {
    return await SecureStore.getItemAsync(myid);
  }

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");
    const myid = await getValueFor("myid");

    const axiosPosts = async () => {
      const response = await axios.get(
        "https://tourbook-backend.herokuapp.com/api/users/mydetails",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data.data);
      console.log(response.data.data);
    };
    axiosPosts();
  }, []);

  const PayNow = async () => {
    const token = await getValueFor("token");
    const myid = await getValueFor("myid");

    console.log(tourId, seats, totalPrice, token, myid);
    await axios
      .post(
        "https://tourbook-backend.herokuapp.com/api/orders/create",
        {
          tourID: tourId,
          seats: seats,
          amount: totalPrice,
          touristID: myid,
        },
        { headers: { "x-auth-token": token } }
      )
      .then((response) => {
        console.log(response.data);
        console.log("successs");

        console.log(response.data.balance);
        console.log("successs");
      })
      .catch((err) => {
        console.log("catch error error");

        console.error(err);
        console.log(err.response.data._message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar translucent={false} backgroundColor={COLORS.primary} />

          <View style={style.header6}>
            <View style={style.upView}>
              <Image
                style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
                source={require("../../assets/travel1-01.png")}
              />
            </View>
          </View>

          <View style={style.footer}>
            <Loader visible={loading} />
            {posts.balance < totalPrice ? (
              <>
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    width: "90%",
                    padding: 20,
                    paddingBottom: 22,
                    // borderRadius: 10,
                    // shadowopacity: 80,
                    // elevation: 15,
                    marginTop: 20,
                  }}
                >
                  <Text> {posts.balance}</Text>
                </View>
                <Text
                  style={{
                    color: COLORS.black,
                    marginLeft: 20,

                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  Don't Have payment, purchase credit now
                </Text>

                <Button1
                  title="Purchase Credit"
                  onPress={() => navigation.navigate("Purchasecredit")}
                />

                <Text
                  style={{
                    color: COLORS.black,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginLeft: 20,

                    fontSize: 12,
                  }}
                >
                  Click Purchase Credit to buy the Credit
                </Text>
              </>
            ) : (
              <>
                {/* <Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Or
        </Text> */}

                <View style={{ marginVertical: 20 }}>
                  <View style={{ flex: 1, flexDirection: "row" }}></View>

                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: "bold",
                      fontSize: 18,
                      marginLeft: 20,
                      marginVertical: 10,
                    }}
                  >
                    Got credits then Pay now.
                  </Text>

                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: "bold",
                      fontSize: 18,
                      marginLeft: 20,
                      marginVertical: 10,
                      marginLeft: 20,
                    }}
                  >
                    You have to pay : {totalPrice}
                  </Text>
                  <View
                    style={{
                      width: 200,
                      justifyContent: "center",
                      marginLeft: 110,
                    }}
                  >
                    <Button1 title="Pay Now" onPress={PayNow} />
                  </View>

                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    Click pay now to pay the payment
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header6: {
    height: 400,
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
    marginTop: -220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    elevation: 30,

    //paddingHorizontal: 30
  },
  upView: {
    flex: 2,
    width: "100%",
    marginBottom: 230,
    //backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
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

export default UserProfile1;
