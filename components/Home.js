import * as React from "react";
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

const { width, height } = Dimensions.get("screen");

import { StatusBar } from "expo-status-bar";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
//import Input from '../components/Input';

import MainScreen from "../components/MainScreen";
//import {Component} from 'react';

const Separator = () => <View style={styles.separator} />;

const Home = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View>
        <View>
          <Text style={styles.headerText}> Get Lost In Beautiful Day</Text>
        </View>
        <View style={{ paddingTop: 15, paddingLeft: 15 }}></View>

        <View style={styles.container}>
          <Text style={styles.baseTextL}> Category </Text>
          <View style={styles.Icon}>
            <Ionicons
              name="bed"
              size={50}
              color="black"
              style={{
                padding: 20,
              }}
            />
            <MaterialIcons
              name="flight"
              size={50}
              color="black"
              style={{
                padding: 20,
              }}
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
      </View>

      <View>
        <Button
          title="Press me Please to navigate to Main compnent"
          onPress={() => navigation.navigate("MainScreen")}
        />
      </View>

      <View></View>
      <Separator />
    </ScrollView>
  </SafeAreaView>
);

const styles1 = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    //marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
