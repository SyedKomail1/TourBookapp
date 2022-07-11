import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import cars from "../consts/cars";
const { width } = Dimensions.get("screen");
import COLORS from "../consts/colors";
const cardWidth = width / 1.8;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarHomeScreen2 = ({ navigation }) => {
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

  const usePosts = posts.map((post, car, index) => {
    return (
      <View>
        <Text> {post?._id}</Text>
        <Text> {post?.name}</Text>
        <Text> {post?.price}</Text>
      </View>
    );
  });

  const Card = ({ post, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate("CarDetailsScreen", post)}
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
            >
              {post?._id}
            </Text>
          </View>
          {/* <Image source={""} style={style.cardImage} /> */}
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {post?.name}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {post?.price}
                </Text>
              </View>
              <Ionicons name="bookmark" size={20} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="star" size={15} color={COLORS.orange} />
                <Ionicons name="star" size={15} color={COLORS.orange} />
                <Ionicons name="star" size={15} color={COLORS.orange} />
                <Ionicons name="star" size={15} color={COLORS.orange} />
                <Ionicons name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>
                365reviews
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopCarCard = ({ car }) => {
    return (
      <View style={style.topCarCard}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <Ionicons name="star" size={15} color={COLORS.orange} />
          <Text
            style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15 }}
          >
            5.0
          </Text>
        </View>
        <Image style={style.topCarCardImage} source={car.image} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>{car.name}</Text>
          <Text style={{ fontSize: 7, fontWeight: "bold", color: COLORS.grey }}>
            {car.location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <View style={{ flexDirection: "row" }}>
            {/* <Text style={{fontSize: 30, fontWeight: 'bold'}}>in </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Paris
            </Text> */}
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CategoryList /> */}
        <View>
          {posts ? (
            <Animated.FlatList
              onMomentumScrollEnd={(e) => {
                setActiveCardIndex(
                  Math.round(e.nativeEvent.contentOffset.x / cardWidth)
                );
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              horizontal
              data={posts}
              contentContainerStyle={{
                paddingVertical: 30,
                paddingLeft: 20,
                paddingRight: cardWidth / 2 - 40,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                <Card post={(item, index)} />;
              }}
              snapToInterval={cardWidth}
            />
          ) : (
            <>
              <Text>hello</Text>
            </>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.grey }}>
            Top Cars
          </Text>
          <Text style={{ color: COLORS.grey }}>Show all</Text>
        </View>
        <FlatList
          data={cars}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopCarCard car={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topCarCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topCarCardImage: {
    height: 80,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default CarHomeScreen2;
