import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-paper";
import COLORS from "../consts/colors";
import { Appbar } from "react-native-paper";

//import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import axios from "axios";
import Pusher from "pusher-js/react-native";
const UserProfile8 = ({ route, navigation }) => {
  const { token, email, receiverID, conversation } = route.params;
  const [tempMessage, setTempMessage] = useState([]);

  const [con, setCon] = useState(conversation);

  console.log(token, email, receiverID, conversation._id);
  const [messages, setMessages] = useState([]);

  const [msg, setmsg] = useState();

  const renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };
  useEffect(() => {
    console.log("UseEffect1");
    // if (con && !messages) {
    axios
      .get(
        `http://tourbook-backend.herokuapp.com/api/messages/conversation/${conversation._id}`,
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((res) => {
        console.log("Get messages", res.data.data);
        setMessages(res.data.data);
      })
      .catch((err) => console.log("error idhr hai"));
    // }
  }, [conversation]);

  useEffect(() => {
    if (conversation?._id) {
      const pusher = new Pusher("8446967bdc196e48bfbc", {
        cluster: "ap2",
        encrypted: true,
      });

      const channel = pusher.subscribe(conversation._id);

      channel.bind("message-received", (data) => {
        setMessages([...messages, data]);
        // console.log("array", messages);
        console.log("pusher", data);
      });

      return () => {
        pusher.unsubscribe(conversation._id);
      };
    }
  }, [messages]);

  const SendMessage = () => {
    console.log(msg);
    const m = msg;
    setmsg("");
    axios
      .post(
        "http://tourbook-backend.herokuapp.com/api/messages/create",
        {
          roomID: conversation._id,
          receiver: receiverID,
          message: m,
        },
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((res) => {
        console.log("conversation init", res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const RenderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: COLORS.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Avatar.Icon
          style={{
            backgroundColor: COLORS.white,
            iconColor: COLORS.primary,
            marginRight: -10,
          }}
          size={40}
          icon="account"
        />
        <Appbar.Content title={messages[0]?.receiver?.fname} />

        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      {messages ? (
        <FlatList
          style={styles.list}
          data={messages}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item?.sender?.email !== email;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

            return (
              <>
                {inMessage ? (
                  // lefft side wala receiver
                  <View style={[styles.item1, itemStyle]}>
                    <View style={[styles.balloon]}>
                      <Text>{item.message}</Text>
                    </View>
                    {renderDate(item.createdAt)}
                  </View>
                ) : (
                  // right side wale tere wala yani sender
                  <View style={[styles.item, itemStyle]}>
                    <View style={[styles.balloon]}>
                      <Text>{item.message}</Text>
                    </View>
                    {renderDate(item.createdAt)}
                  </View>
                )}
              </>
            );
          }}
        />
      ) : (
        <></>
      )}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={(name_address) => setmsg(name_address)}
          />
        </View>

        <TouchableOpacity onPress={SendMessage} style={styles.btnSend}>
          <Image
            source={{
              uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
    // backgroundColor: COLORS.primary,
  },
  itemIn: {
    alignSelf: "flex-start",
  },
  itemOut: {
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    backgroundColor: "honeydew",
    flexDirection: "row",
    // backgroundColor: "#eeeeee",
    borderRadius: 10,
    padding: 5,
  },

  item1: {
    marginVertical: 14,
    flex: 1,
    //backgroundColor: COLORS.primary,
    flexDirection: "row",
    backgroundColor: "ghostwhite",
    borderRadius: 10,
    padding: 5,
  },
});
export default UserProfile8;
