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

const UserProfile55 = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [totalUsers1, setTotalUsers1] = useState();
  const [totalUsers2, setTotalUsers2] = useState();
  const [totalUsers3, setTotalUsers3] = useState();
  const [totalUsers4, setTotalUsers4] = useState();
  const [totalUsers5, setTotalUsers5] = useState();

  const [pendingVendorRequest, setPendingVendorRequest] = useState([]);

  const t = "";

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");

    const axiosPosts = async () => {
      const response = await axios.get(
        "http://tourbook-backend.herokuapp.com/api/admin/dashboard",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data.data.allUsers);
      setTotalUsers(response.data.data.totalNoOfUsers);
      setTotalUsers1(response.data.data.totalNoOfActiveUsers);
      setTotalUsers2(response.data.data.totalNoOfDeletedUsers);
      setTotalUsers3(response.data.data.totalNoOfTours);
      setTotalUsers4(response.data.data.totalOngoingTours);
      setTotalUsers5(response.data.data.totalCredits);

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
            height: "20%",
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
              marginBottom: 20,
              height: 60,
              justifyContent: "center",
            }}
          >
            Total Users / Tours
          </Text>
        </View>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
                <Text>
                  {" "}
                  Total No Of Users: {"  "}
                  {totalUsers}{" "}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
                <Text>
                  {" "}
                  Total No Of Active Users: {"  "} {totalUsers1}{" "}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
              <Text>
                {" "}
                Total No Of Deleted Users {"  "}
                {totalUsers2}{" "}
              </Text>
            </View>
          </View>
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
              <Text>
                {" "}
                Total Tours {"  "}
                {totalUsers3}{" "}
              </Text>
            </View>
          </View>
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
              <Text>
                {" "}
                Total Ongoing Tours {"  "}
                {totalUsers4}{" "}
              </Text>
            </View>
          </View>
        </Card>

        <Card
          style={{
            paddingHorizontal: 10,
            elevation: 25,
          }}
        >
          <View>
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
              <Text>
                {" "}
                Total Credit {"  "}
                {totalUsers5}{" "}
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default UserProfile55;
