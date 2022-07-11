import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Share,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import UserAvatar from "react-native-user-avatar";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar } from "react-native-paper";

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const myCustomShare = async () => {
    const shareOptions = {
      message: "This is a test message",
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");

    console.log("called axios in user profile", getValueFor("token"));
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

  const LogOut = () => {
    SecureStore.deleteItemAsync("token").then(
      navigation.navigate("LoginScreen")
    );
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: COLORS.primary,
            height: 150,
          }}
        >
          <TouchableOpacity>
            {/* <Image source={require('../../assets/onboardImage3.jpg')}
                    style={{ width: 30, height:80}}></Image> */}
            <View></View>
            <View></View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/onboardImage3.jpg")}
            style={{
              width: 170,
              height: 170,
              borderRadius: 100,
              marginTop: -90,
              borderWidth: 90,
              borderColor: "white",
            }}
          ></Image>

          <Avatar.Image
            style={{
              marginTop: -165,
            }}
            size={150}
            source={{ uri: posts.profilePicture }}
          />

          {/* bgColors={['#ccc', '#fafafa', '#ccaabb']} */}
          {/* <Image source={require('../../assets/onboardImage3.jpg')} style={{width:170, height:170,
                 borderRadius:100, marginTop:-175, borderWidth: 7,
                 borderColor: "white"}}></Image> */}

          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              padding: 30,
              color: "black",
            }}
          >
            {posts.fname} {posts.lname}
          </Text>
        </View>

        {/* <PhotoUpload
   onPhotoSelect={avatar => {
     if (avatar) {
       console.log('Image base64 string: ', avatar)
     }
   }}
 >
   <Image
     style={{
       paddingVertical: 30,
       width: 150,
       height: 150,
       borderRadius: 75
     }}
     resizeMode='cover'
     source={{
       uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
     }}
   />
 </PhotoUpload> */}

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Text>{posts.country}</Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Text> {posts.userType}</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Text> Balance: {posts.balance}</Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Text onPress={() => navigation.navigate("Contact")}>Contact us</Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Text onPress={() => navigation.navigate("About")}>
            About Company{" "}
          </Text>
        </View>

        <Shared />

        {/* <Countrypicker/> */}

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowopacity: 80,
            elevation: 15,
            margin: 50,
          }}
        >
          <Button title="Logout" onPress={LogOut} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
