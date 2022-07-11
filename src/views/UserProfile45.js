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

const CartCard1 = ({ conversation, email, handleStartChat }) => {
  console.log("one notification", conversation, email);
  const receiver = conversation?.people?.find((r) => r.email !== email);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleStartChat(receiver?._id, email);
        }}
        style={style.cartCard1}
      >
        <Image
          source={{ uri: receiver?.profilePicture }}
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
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {receiver?.fname} {receiver?.lname}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {conversation?.lastMessage?.message}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.grey }}>
            {" "}
            {conversation?.createdAt}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const UserProfile45 = ({ route, navigation }) => {
  const { token, email } = route.params;
  const [instance, setInstance] = useState();

  const [conversations, setConversations] = useState();
  console.log("Conversation", token, email);

  const handleStartChat = (id, email) => {
    console.log(id, email, token);
    axios
      .post(
        "http://tourbook-backend.herokuapp.com/api/conversations/init",
        {
          receiver: id,
        },
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((res) => {
        console.log("conversation init", res.data.data);
        setInstance(res.data.data);
        navigation.navigate("UserProfile8", {
          token: token,
          email: email,
          receiverID: id,
          conversation: res.data.data,
        });
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    axios
      .get("http://tourbook-backend.herokuapp.com/api/conversations/mine", {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        console.log(res);
        setConversations(res.data.data);
      });
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
        Conversations
      </Text>
      {conversations ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={conversations}
          renderItem={({ item }) => (
            <CartCard1
              conversation={item}
              email={email}
              handleStartChat={handleStartChat}
            />
          )}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        />
      ) : (
        <Text>No Contacts</Text>
      )}
    </ScrollView>
  );
};

export default UserProfile45;

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
    backgroundColor: "floralwhite",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cartCard1: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
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
