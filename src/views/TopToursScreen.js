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
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import cars from "../consts/cars";
//const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

import { Fontisto } from "@expo/vector-icons";

import COLORS from "../consts/colors";
import Button from "../../components/Button";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");

const TopToursScreen = ({ navigation }) => {
  const categories = ["All", "Popular", "Top Rated", "Featured", "Luxury"];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("called axios");
    const axiosPosts = async () => {
      const response = await axios.get(
        "https://tourbook-backend.herokuapp.com/tour/all",
        { headers: { "x-auth-token": AsyncStorage.getItem("accessToken") } }
      );
      setPosts(response.data.data);
      console.log(response.data.data);
    };
    axiosPosts();
  }, []);

  const usePosts = posts.map((post) => {
    return (
      <View>
        <Text> {post._id}</Text>
        <Text> {post?.name}</Text>
        <Text> {post?.price}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
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
      </View>

      <View>
        {usePosts}
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
export default TopToursScreen;
