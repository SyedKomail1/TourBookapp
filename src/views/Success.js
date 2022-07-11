import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import Constants from 'expo-constants';
import Icon from "react-native-vector-icons/MaterialIcons";

import UserAvatar from "react-native-user-avatar";

import COLORS from "../consts/colors";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const { width, height } = Dimensions.get("window");

const Success = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [pendingVendorRequest, setPendingVendorRequest] = useState([]);
  const header = ['heading 1', 'heading 2', 'heading 3']
 
  const t = "";



  

 

  const PendingVendor = pendingVendorRequest?.map((request) => {
    return (
      <View>
        <Text>{req?.fname}</Text>
      </View>
    );
  });

  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

<View style={style.header6}>
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
              source={require("../../assets/travel1-01.png")}
            />
          </View>
        </View>

        <View style={style.footer}>

        <Text
            style={{ color: COLORS.black, justifyContent: "center",fontSize: 22, marginLeft: 100,marginBottom: 20,fontWeight: "bold" }}
          >
Requests Successful
          </Text>
          <TouchableOpacity       onPress={() => navigation.navigate("HomeScreen")}
>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Icon style={{ color: COLORS.primary, }} name="arrow-back-ios" size={20} />
              <Text style={{ fontSize: 18, fontWeight: "bold",color: COLORS.primary, }}>Go back to HomeScreen</Text>
            </View>
          </TouchableOpacity>
        
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: 250, marginTop: 20 }}
              source={require("../../assets/Cross.png")}
            />
          </View>

        
    
        

     
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const style = StyleSheet.create({
  header6: {
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  header1: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: COLORS.primary,
  },

  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 20,
  },
  textPart2: {
    color: COLORS.grey,

    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  inputContainer: {
    height: 60,
    width: 400,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    margin: 5,
  },
  categoryContainer: {
    marginTop: 60,
    alignItems: "center",

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

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'COLORS.white',
    padding: 8,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: COLORS.white,
  },

  footer: {
    marginTop: -220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    elevation: 30,

    //paddingHorizontal: 30
  },
  upView: {
    flex: 2,
    width: "100%",
    marginBottom: 230,
    //backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Success;
