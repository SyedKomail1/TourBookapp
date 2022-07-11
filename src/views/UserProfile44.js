import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import foods from "../consts/foods";
import COLORS from "../consts/colors";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const CartCard = async ({ item }) => {
  return (
    <View style={style.cartCard}>
      <Image
        source={item?.image}
        style={{ height: 80, width: 80, borderRadius: 40 }}
      />
      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item?.name}</Text>
        <Text style={{ fontSize: 13, color: COLORS.grey }}>
          {item?.ingredients}
        </Text>
      </View>
    </View>
  );
};

const UserProfile44 = ({ navigation }) => {
  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }

  const [conversations, setConversations] = useState();
  useEffect(async () => {
    const token = await getValueFor("token");
    console.log(token);

    const res = await axios.get(
      "http://tourbook-backend.herokuapp.com/api/conversations/mine",
      { headers: { "x-auth-token": token } }
    );

    console.log(res.data.data);
    console.log(token);
    setConversations(res.data.data);
  }, []);
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 30,
          marginTop: 20,
        }}
      >
        Messages
      </Text>
      {conversations ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={conversations}
          renderItem={({ item }) => <CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </ScrollView>
  );
};

export default UserProfile44;

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,

    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
