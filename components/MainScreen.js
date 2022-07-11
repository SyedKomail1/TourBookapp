import * as React from "react";
import { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "../styles/styles";
//import Input from "./Input";
const { width, height } = Dimensions.get("screen");

import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ImageButton from "./ImageButton";
import { TouchableHighlight } from "react-native-gesture-handler";

const MainScreen = ({ navigation }) => (
  <ScrollView>
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <View>
        <Text style={styles.headerText}> Main Get Lost In Beautiful Day</Text>
      </View>

      <View style={styles.container}>
        <View>
          <Input />
          <Text style={styles.baseTextL}> Category </Text>
        </View>
        <View style={styles.Icon}>
          <Ionicons
            name="bed"
            size={50}
            color="black"
            style={{
              padding: 20,
            }}
            onPress={() => navigation.navigate("Hotelbooking")}
          />

          <MaterialIcons
            name="flight"
            size={50}
            color="black"
            style={{
              padding: 20,
            }}
            onPress={() => navigation.navigate("Tripbooking")}
          />
          <Ionicons
            name="ios-person"
            size={50}
            color="black"
            style={{
              padding: 20,
            }}
          />
        </View>

        <StatusBar style="auto" />
      </View>
      <View style={styles.ImageContainer}>
        <TouchableHighlight onPress={() => navigation.navigate("Tripbooking")}>
          <View style={styles.ImageView}>
            <Image
              source={require("../src/assets/location2.jpg")}
              style={styles.Image1}
            />
            <ImageButton title="Premium" description="Great Places" />
          </View>
        </TouchableHighlight>
        <View style={styles.ImageView}>
          <Image
            source={require("../src/assets/location3.jpg")}
            style={styles.Image1}
          />
          <ImageButton title="Luxury" description="Stunning Places" />
        </View>
        <View style={styles.ImageView}>
          <Image
            source={require("../src/assets/location1.jpg")}
            style={styles.Image1}
          />
          <ImageButton title="Premium" description="Great Places" />
        </View>
      </View>
    </View>
  </ScrollView>
);
export default MainScreen;
