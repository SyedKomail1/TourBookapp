import * as React from 'react';
import {View, Text, SafeAreaView,Image, StyleSheet, Button, ScrollView, Dimensions} from "react-native";
import { styles } from "../styles/styles";

const {width, height} = Dimensions.get ("screen");

import { StatusBar } from 'expo-status-bar';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//import Input from '../components/Input';

//import MainScreen from '../components/MainScreen';
//import {Component} from 'react';



const Separator = () => (
  <View style={styles.separator} />
);

const Hotelbooking = ({navigation}) => (
  <SafeAreaView style={styles.container}>
      
    <ScrollView>
    <View>
    <Text style = {styles.headerText} > Hotel Booking
            </Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
    <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
</View>
    <Separator />
    </ScrollView>

  </SafeAreaView>
);

const styles1 = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    //marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Hotelbooking;