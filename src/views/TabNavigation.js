import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons/";
import { Ionicons } from "@expo/vector-icons/";

//import Tour from './TopToursScreen1';
//import Profile from './Userprofile';
import HomeScreen from "./HomeScreen";
import Userprofile2 from "./Userprofile2";
import Userprofile from "./Userprofile";

import COLORS from "../consts/colors";

const Tab = createMaterialBottomTabNavigator();

function TabNavigation(props) {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#57B9BB"
      inactiveColor="#000"
      barStyle={{
        backgroundColor: "#fff",
        position: "absolute",
        // bottom: 10,
        // left: 10,
        // right: 10,
        height: 55,
        elevation: 1,
        // borderRadius: 20,
        borderColor: "grey",
        borderWidth: 0.5,
        overflow: "hidden",
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
      }}
    >
      <Tab.Screen
        name="Userprofile2"
        component={Userprofile2}
        options={{
          tabBarLabel: "My Tours",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-signs" color="#00B761" size={22} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color="#00B761" size={22} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color="#00B761" size={22} />
          ),
        }}
      />

      <Tab.Screen
        name="Userprofile"
        component={Userprofile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-sharp" color="#00B761" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;

// const styles = StyleSheet.create({

//     tabBar: {

//     },
//     tab:{
//         paddingBottom: 0,

//     }
// })
