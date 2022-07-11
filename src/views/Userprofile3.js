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

const Userprofile3 = ({navigation }) => {
 
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

 const t="";

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");
   
    const axiosPosts = async () => {
      const response = await axios.get(
        "http://tourbook-backend.herokuapp.com/order/mine",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data);
      // console.log(response.data);
      console.log(response.data[0]);
    };
    axiosPosts();
  }, []);

  const PayNow = async () =>{
    const token = await getValueFor("token");

   console.log( posts[0].amount,posts[0].amount)

   
  
  }

  const usePosts = posts.map((post) => {
    return (
      <View>
        <Text> {post._id}</Text>
        <Text> {post?.amount}</Text>
        <Text> {post?.seats}</Text>
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
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
           // borderRadius: 10,
           // shadowopacity: 80,
           // elevation: 15,
            marginTop: 20,
          }}
        >
          {/* <Text> {posts.balance}</Text> */}
        </View>
        {posts?.map((post) =>{
<Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
{post?.amount} {post?.seats} hello
</Text>
})}

{usePosts}

<Button
          title="Purchase Credit"
          onPress={PayNow}
        />
      

        <Button
          title="Purchase Credit"
          onPress={PayNow}
        />

<Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click Purchase Credit to buy the Credit
          </Text>
       
      </ScrollView>
    </View>
  );
};

export default Userprofile3;

