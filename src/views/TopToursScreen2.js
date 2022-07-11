import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import COLORS from "../consts/colors";
import places from "../consts/places";
import Button from "../../components/Button";
import axios from "axios";

const { width } = Dimensions.get("screen");
const TopToursScreen2 = ({ navigation }) => {
  const [allTours, setallTours] = useState(null);
  const [posts, setPosts] = useState([]);
  const categoryIcons = [];

  useEffect(() => {
    console.log("called axios");
    const axiosPosts = async () => {
      const response = await axios.get(
        "https://tourbook-backend.herokuapp.com/api/tours/all",
        { headers: { "x-auth-token": AsyncStorage.getItem("accessToken") } }
      );
      setPosts(response.data.data);
      console.log(response.data.data);
    };
    axiosPosts();
  }, []);
  const usePosts = posts.map((post, car, index) => {
    return (
      <View>
        <Text> {post?._id}</Text>
        <Text> {post?.name}</Text>
        <Text> {post?.price}</Text>
      </View>
    );
  });
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

  const Card = ({ post }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => navigation.navigate("DetailsScreen1", post)}
      >
        <ImageBackground
          style={style.cardImage}
          source={require("../../assets/location2.jpg")}
          //source={{ uri: post.tourpics[0] }}
          //  source={{ uri: post.tourpics[0] }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {post.name}
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
              <Ionicons name="pricetag" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                Rs . {post.price}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                {post.seats} seats available
              </Text>

              {/* <Ionicons name="star" size={20} color={COLORS.white} /> */}
              {/* <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text> */}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.black,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Top Tours
          </Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-back-ios" size={20} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Go back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => <Card post={item} />}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  textPart2: {
    color: COLORS.grey,

    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,

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
    marginBottom: 20,

    borderRadius: 10,
    width: width - 40,
    height: 200,
    // marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },

  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
});
export default TopToursScreen2;
