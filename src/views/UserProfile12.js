import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import UserAvatar from "react-native-user-avatar";

import COLORS from "../consts/colors";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { set } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const UserProfile12 = ({ navigation }) => {
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
        "http://tourbook-backend.herokuapp.com/admin/dashboard",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data.data.allUsers);
      setTotalUsers(response.data.data.totalNoOfUsers);
      setPendingVendorRequest(response.data.data.pendingVendorRequests);
      console.log(response.data.data.allUsers);
      console.log(response.data.data.pendingVendorRequests);

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
          paddingHorizontal: 10,
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
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                // backgroundColor: "#fff",
                width: "90%",
                // padding: 20,
                paddingBottom: 22,
                // borderRadius: 10,
                // shadowopacity: 80,
                marginTop: 20,
              }}
            >
              <Avatar.Image
                style={{
                  marginTop: -10,
                }}
                size={50}
                source={{ uri: post?.profilePicture }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",

                paddingRight: 20,
                paddingBottom: 22,

                marginTop: 20,
                //marginRight: 20,
              }}
            >
              <Text> {post?.fname} </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingRight: 20,
                paddingBottom: 36,

                marginTop: 20,
                marginRight: 10,
              }}
            >
              <Text>
                {"\n"} {post?.userType}{" "}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
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
                marginTop: 20,
                marginRight: 30,
              }}
            >
              <Text>
                {"\n"} {post?.email}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                // padding: 20,
                paddingBottom: 20,
                marginTop: 20,
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

                marginTop: 20,
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

                marginTop: 20,
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
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: "10%",
            paddingHorizontal: 20,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            paddingVertical: 50,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              //backgroundColor: COLORS.primary,
              textAlign: "center",
              fontSize: 24,
              marginTop: 20,
              marginBottom: -570,
              height: 60,
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            List of All Users
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginLeft: 15,
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              paddingRight: 15,
              paddingLeft: 10,

              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Name
          </Text>

          <Text
            style={{
              color: COLORS.black,
              paddingRight: 15,
              paddingLeft: 13,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            User Type
          </Text>

          <Text
            style={{
              color: COLORS.black,
              paddingRight: 15,
              paddingLeft: 18,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Email
          </Text>

          <Text
            style={{
              color: COLORS.black,
              paddingRight: 15,
              paddingLeft: 10,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Country
          </Text>
        </View>

        <View style={{ backgroundColor: COLORS.light }}>{usePosts}</View>

        {/* <Text
          style={{
            color: COLORS.black,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {totalUsers}{" "}
        </Text> */}
      </ScrollView>
    </View>
  );
};

export default UserProfile12;
