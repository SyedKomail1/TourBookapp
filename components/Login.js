import React, {Component} from "react";

import {View,StyleSheet, style, Dimensions} from "react-native";
import {FontAwesome5} from "@expo/vector-icons"
import { TextInput } from "react-native-gesture-handler";
const {width, height} = Dimensions.get ("screen");
import { styles } from "../styles/styles";

export default function Login({placeholder, OnChangeText}){
     
    return(
    <>
    <View style={styles.searchText}>
    <FontAwesome5  style={{position: "absolute", left: 15, top: 10, color: "white",}} name="search" size={20} />
    <TextInput style={{color: "white", marginLeft: 40,}}/>
    </View>
    </>
            );
        }
    