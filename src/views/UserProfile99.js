import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import UserAvatar from "react-native-user-avatar";
import Constants from "expo-constants";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../consts/colors";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { set } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const UserProfile99 = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [pendingVendorRequest, setPendingVendorRequest] = useState([]);

  const t = "";

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");

    const axiosPosts = async () => {
      const response = await axios.get(
        "http://tourbook-backend.herokuapp.com/api/admin/pendingVendors",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data.data);
      //setTotalUsers(response.data.data.totalNoOfUsers);
      // setPendingVendorRequest(response.data.data.pendingVendorRequests);
      console.log(response.data.data);
      //  console.log(response.data.data.pendingVendorRequests);

      // console.log(response.data.data.myTours);
    };
    axiosPosts();
  }, []);

  const PayNow = async () => {
    const token = await getValueFor("token");
  };
  const LeftContent = (props) => <Avatar.Icon {...props} icon="message-plus" />;

  const usePosts = posts?.map((post) => {
    return (
      <Card
        style={{
          paddingLeft: 20,
          elevation: 25,
        }}
      >
        <View>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 4,
              width: width - 5,
              // elevation: 5,
            }}
          ></View>

          <View
            style={{
              flex: 1,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "COLORS.black",
              elevation: 15,
            }}
          >
            <View
              style={{
                flex: 2,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                // backgroundColor: "#fff",
                width: "90%",
                // padding: 20,
                paddingBottom: 22,
                // borderRadius: 10,
                // shadowopacity: 80,
                marginRight: 20,
                marginTop: 22,
              }}
            >
              <Avatar.Image
                style={{
                  marginTop: -10,
                }}
                size={50}
                source={{ uri: post?.profilePicture }}
              />

              <View
                style={{
                  marginTop: 9,
                }}
              >
                <Text> {post?.fname} </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingRight: 20,
                paddingBottom: 36,

                //marginTop: 20,
                marginLeft: 4,
              }}
            >
              <Text>
                {"\n"} {post?.userType}{" "}
              </Text>
            </View>

            <View
              style={{
                flex: 2.2,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                //  backgroundColor: "#fff",
                // width: "90%",
                //padding: 20,
                paddingBottom: 20,
                // borderRadius: 10,
                // shadowopacity: 80,
                // elevation: 15,
                //marginTop: 20,
                marginRight: 30,
              }}
            >
              <Text>
                {"\n"} {post?.email}
              </Text>
            </View>

            <View
              style={{
                flex: 1.4,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                // padding: 20,
                paddingBottom: 20,
                //marginTop: 20,
                marginRight: 40,
              }}
            >
              <Text>
                {"\n"} {post?.country}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "COLORS.black",
              elevation: 15,
            }}
          >
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",

                paddingRight: 20,
                paddingBottom: 22,

                // marginTop: 20,
                //marginRight: 20,
              }}
            >
              <Text> {post?.phoneNumber} </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingRight: 20,
                paddingBottom: 36,

                //marginTop: 20,
                marginRight: 10,
              }}
            >
              <Text>
                {"\n"} {post?.balance}{" "}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  });

  const PendingVendor = pendingVendorRequest?.map((request) => {
    return (
      <View>
        <Text>{req?.fname}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header6}>
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
              source={require("../../assets/travel1-01.png")}
            />
          </View>
        </View>

        <View style={style.footer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
          >
            <Text
              style={{
                color: COLORS.black,
                fontSize: 22,
                marginLeft: 20,
                fontWeight: "bold",
              }}
            >
              All pending vendor requests are here:
            </Text>

            {/* <View style={{ marginTop: -90 }}>{usePosts}</View> */}
            <View style={{ marginLeft: -390 }}></View>

            <View style={style.container}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,

                      //backgroundColor: COLORS.primary,
                    }}
                  >
                    Name
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,

                      //backgroundColor: COLORS.primary,
                    }}
                  >
                    Email
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Phone Number{" "}
                  </DataTable.Title>
                  {/* <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Created{" "}
                  </DataTable.Title> */}

                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      //  backgroundColor: COLORS.primary,
                    }}
                  >
                    User Type{" "}
                  </DataTable.Title>
                  {/* <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    City
                  </DataTable.Title> */}
                  {/* <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Balance
                  </DataTable.Title> */}
                  {/* <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Seats
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 153,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Places
                  </DataTable.Title>

                  <DataTable.Title
                    style={{
                      flex: 3,
                      width: 177,
                      marginRight: 50,
                      // backgroundColor: COLORS.primary,
                    }}
                  >
                    Description
                  </DataTable.Title> */}
                </DataTable.Header>
                {posts.map((post) => {
                  return (
                    <View
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <DataTable.Row
                        style={{
                          textAlign: "center",
                          color: "grey",
                          fontSize: 10,
                        }}
                      >
                        <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 70,
                            paddingLeft: 10,
                            marginRight: 30,
                            borderRadius: 4,
                            flexDirection: "row",

                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {" "}
                          {/* <Avatar.Image
                            style={{
                              marginTop: -10,
                            }}
                            size={50}
                            source={{ uri: post?.profilePicture }}
                          /> */}
                          {post?.fname} {""}
                          {post?.lname}
                        </DataTable.Cell>

                        <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 90,
                            paddingLeft: 10,
                            marginRight: 40,
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post?.email}
                        </DataTable.Cell>
                        {/* <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 70,
                            paddingLeft: 10,
                            marginRight: 40,

                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post.tourID.description}
                        </DataTable.Cell> */}
                        <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 70,
                            paddingLeft: 10,
                            marginRight: 30,
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post?.phoneNumber}
                        </DataTable.Cell>
                        {/* <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 70,
                            paddingLeft: 10,
                            paddingLeft: 10,
                            marginRight: 30,
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post.tourID.description}{" "}
                        </DataTable.Cell> */}
                        <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 70,
                            paddingLeft: 10,
                            marginRight: 30,
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post?.userType} {"\n"}
                        </DataTable.Cell>

                        {/* <DataTable.Cell
                          style={{
                            flex: 3,
                            paddingLeft: 10,
                            width: 125,
                            marginRight: 20,
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post.city.name} {"\n"}
                        </DataTable.Cell> */}

                        {/* <DataTable.Cell
                          style={{
                            flex: 3,
                            width: 90,
                            paddingLeft: 10,
                            marginRight: 40,

                            backgroundColor: COLORS.primary,
                          }}
                        >
                          {post.balance} {"\n"}
                        </DataTable.Cell> */}
                      </DataTable.Row>
                    </View>
                  );
                })}
              </DataTable>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: -220,
            marginRight: 10,
            justifyContent: "flex-end",

            elevation: 5,
          }}
        >
          <Ionicons
            name="arrow-forward"
            color={COLORS.grey}
            size={28}
            onPress={() => navigation.navigate("Notification")}
          />

          {/* <Text>Balance {setBalance(amount)}</Text> */}
        </View>

        <View
          style={{
            marginBottom: 220,

            elevation: 5,
          }}
        >
          {/* <Text>Balance {setBalance(amount)}</Text> */}
        </View>
      </ScrollView>
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
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "COLORS.white",
    padding: 8,
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
    // elevation: 30,

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

export default UserProfile99;
