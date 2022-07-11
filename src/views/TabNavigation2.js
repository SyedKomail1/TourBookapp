import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons/";
import { Ionicons } from "@expo/vector-icons/";

import Tour from "./TopToursScreen1";
import Profile from "./Userprofile";
import AgencyHomeScreen from "./AgencyHomeScreen";
import COLORS from "../consts/colors";

const Tab = createMaterialBottomTabNavigator();

function TabNavigation2(props) {
  return (
    <Tab.Navigator
      initialRouteName="AgencyHomeScreen"
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
      {/* <Tab.Screen
        name="Tour"
        component={Tour}
        options={{
          tabBarLabel: "Tours",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-signs" color="#00B761" size={22} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="AgencyHomeScreen"
        component={AgencyHomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color="#00B761" size={22} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
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

export default TabNavigation2;

// const styles = StyleSheet.create({

//     tabBar: {

//     },
//     tab:{
//         paddingBottom: 0,

//     }
// })
