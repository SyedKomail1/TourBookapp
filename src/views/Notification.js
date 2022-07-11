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
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const CartCard = ({ notification }) => {
  console.log("one notification", notification);
  return (
    <View style={style.cartCard}>
      <Image
        source={require("../../assets/2-01.png")}
        style={{ height: 100, width: 100, borderRadius: 40 }}
      />
      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {notification?.type}
        </Text>
        <Text style={{ fontSize: 13, color: COLORS.grey }}>
          {notification?.text}
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.grey }}>
          {" "}
          {notification?.createdAt}
        </Text>
      </View>
    </View>
  );
};

const CartCard1 = ({ notification, handleRead }) => {
  console.log("one notification", notification);

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={() => {
          handleRead(notification._id);
        }}
        style={style.cartCard1}
      >
        <Image
          source={require("../../assets/1-01.png")}
          style={{ height: 100, width: 100, borderRadius: 40 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {notification?.type}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {notification?.text}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.grey }}>
            {" "}
            {notification?.createdAt}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Notification = ({ route, navigation }) => {
  const r = route.params;
  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  const [readNotifications, setReadNotifications] = useState(
    r.readNotifications
  );
  const [unReadNotifications, setUnReadNotifications] = useState(
    r.unReadNotifications
  );

  const [totalUnRead, setTotalUnRead] = useState();
  console.log("notifications");
  const handleRead = async (id) => {
    const token = await getValueFor("token");

    const response = await axios.put(
      "http://tourbook-backend.herokuapp.com/api/notifications/read",
      { notificationID: id },
      { headers: { "x-auth-token": token } }
    );
    console.log(response.data);

    const res = await axios.get(
      "http://tourbook-backend.herokuapp.com/api/notifications/mine",
      { headers: { "x-auth-token": token } }
    );

    console.log("notifications", res.data.data);
    setReadNotifications(
      res?.data?.data?.filter((item) => item.isRead === true)
    );
    setUnReadNotifications(
      res?.data?.data?.filter((item) => item.isRead === false)
    );
    setTotalUnRead(
      res?.data?.data?.filter((item) => item.isRead === false)?.length
    );
  };
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
        Notifications
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        data={unReadNotifications}
        renderItem={({ item }) => (
          <CartCard1 notification={item} handleRead={handleRead} />
        )}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        data={readNotifications}
        renderItem={({ item }) => <CartCard notification={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </ScrollView>
  );
};

export default Notification;

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 150,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cartCard1: {
    height: 150,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "e4e9f1",
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
