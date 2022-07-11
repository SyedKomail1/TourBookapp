import "react-native-gesture-handler";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

//import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigation from "./src/views/TabNavigation";
import TabNavigation1 from "./src/views/TabNavigation1";
import TabNavigation2 from "./src/views/TabNavigation2";

import OnBoardScreen from "./src/views/OnBoardScreen";
import Started from "./src/views/Started.js";

import VendorTransaction from "./src/views/VendorTransaction.js";
import VendorRefundrequests from "./src/views/VendorRefundrequests.js";
import VendorReservedTour from "./src/views/VendorReservedTour.js";
//import Pendingvendor1 from "./src/views/Pendingvendor1.js";
import Guestnavigate from "./src/views/Guestnavigate.js";

import UserProfile99 from "./src/views/UserProfile99";

// import CartScreen from "./src/views/CartScreen.js";

// // //import Tripbooking from "./components/Tripbooking";
import HomeScreen from "./src/views/HomeScreen";
import HomeScreen2 from "./src/views/HomeScreen2";

//import CarHomeScreen from "./src/views/CarHomeScreen";

// // import DetailsScreen from "./src/views/DetailsScreen";
import LoginScreen from "./src/views/LoginScreen.js";
import RegisterScreen from "./src/views/RegisterScreen";
import ForgetPassword from "./src/views/ForgetPassword";
import ForgetCode from "./src/views/ForgetCode";
import NewPass from "./src/views/NewPass";
// // import CreateTour from "./src/views/CreateTour";
import Userprofile from "./src/views/Userprofile";
import Userprofile1 from "./src/views/Userprofile1";

import Contact from "./src/views/Contact";
import About from "./src/views/About";
import UserProfile4 from "./src/views/UserProfile4";
import UserProfile8 from "./src/views/UserProfile8";
import UserProfile44 from "./src/views/UserProfile44";
import UserProfile45 from "./src/views/UserProfile45";

// import Shared from "./components/Shared";
import TopToursScreen1 from "./src/views/TopToursScreen1";
import TopToursScreen2 from "./src/views/TopToursScreen2";

// import Caronboardscreen from "./src/views/Caronboardscreen";
import CarHomeScreen from "./src/views/CarHomeScreen";
// import CarDetailsScreen from "./src/views/CarDetailsScreen";
import Booking from "./src/views/Booking";
// import TourGuide from "./src/views/TourGuide";
// import TourGuideDetails from "./src/views/TourGuideDetails";
import TourguideBoard from "./src/views/TourguideBoard";
import TourguideBoard1 from "./src/views/TourguideBoard1";

// import TourguideFind from "./src/views/TourguideFind";
// import BudgetEstimate from "./src/views/BudgetEstimate";
// import TourPlanner from "./src/views/TourPlanner";
import Userprofile2 from "./src/views/Userprofile2";

import UserProfile5 from "./src/views/UserProfile5";
// import UserProfile6 from "./src/views/UserProfile6";
import UserProfile7 from "./src/views/UserProfile7";
import UserProfile55 from "./src/views/UserProfile55";

import UserProfile66 from "./src/views/UserProfile66";

// //import UserProfile11 from "./src/views/UserProfile11";
// //import UserProfile12 from "./src/views/UserProfile12";

import Notification from "./src/views/Notification";

import Customtour from "./src/views/Customtour";

// import TopToursScreen from "./src/views/TopToursScreen";
// // import TopTours from "./src/views/TopTours";
// // import TopTours1 from "./src/views/TopTours1";
// // import TopTours2 from "./src/views/TopTours2";
// import BudgetEstimateBoard from "./src/views/BudgetEstimateBoard";
// import TourPlannerBoard from "./src/views/TourPlannerBoard";
// // import Category1 from "./src/views/Category1";
// // import Category2 from "./src/views/Category2";
// // import Category3 from "./src/views/Category3";
// // import Category4 from "./src/views/Category4";

// import Review from "./src/views/Review";
// // import Tourplannedpage from "./src/views/Tourplannedpage";

import Purchasecredit from "./src/views/Purchasecredit";

// import PassresetSuccess from "./src/views/PassresetSuccess";
import Quote from "./src/views/Quote";

import AgencyHomeScreen from "./src/views/AgencyHomeScreen";
import TgHomeScreen from "./src/views/TgHomeScreen";
import Success from "./src/views/Success";

// // import LoginScreen1 from "./src/views/LoginScreen1.js";
// //import CarHomeScreen2 from "./src/views/CarHomeScreen2.js";
import DetailsScreen1 from "./src/views/DetailsScreen1.js";
import Map from "./src/views/Map.js";

// //Screens
import ChooseLocation from "./src/Screens/ChooseLocation";
import Home from "./src/Screens/Home";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chooseLocation" component={ChooseLocation} />
        <Stack.Screen
          name="Started"
          component={Started}
          options={{ title: "Started" }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "LoginScreen" }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          // options={{ title: "RegisterScreen" }}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ title: "ForgetPassword" }}
        />
        <Stack.Screen
          name="NewPass"
          component={NewPass}
          options={{ title: "NewPass" }}
        />

        <Stack.Screen
          name="Success"
          component={Success}
          options={{ title: "Success" }}
        />

        <Stack.Screen
          name="ForgetCode"
          component={ForgetCode}
          options={{ title: "ForgetCode" }}
        />

        <Stack.Screen name="TabNavigation" component={TabNavigation} />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home Screen" }}
        />

        <Stack.Screen
          name="Guestnavigate"
          component={Guestnavigate}
          options={{ title: "Guestnavigate" }}
        />

        <Stack.Screen
          name="HomeScreen2"
          component={HomeScreen2}
          options={{ title: "Home Screen2" }}
        />

        {/* <Stack.Screen
          name="HomeScreen1"
          component={HomeScreen1}
          options={{ title: "HomeScreen" }}
        />  */}

        <Stack.Screen
          name="Userprofile"
          component={Userprofile}
          options={{ title: "Userprofile" }}
        />

        <Stack.Screen
          name="Userprofile2"
          component={Userprofile2}
          options={{ title: "Userprofile2" }}
        />

        <Stack.Screen
          name="UserProfile99"
          component={UserProfile99}
          options={{ title: "UserProfile99" }}
        />

        {/* <Stack.Screen
          name=" Pendingvendor1r"
          component={Pendingvendor1}
          options={{ title: "Pendingvendor1" }}
        /> */}

        <Stack.Screen
          name="AgencyHomeScreen"
          component={AgencyHomeScreen}
          options={{ title: "AgencyHomeScreen" }}
        />

        <Stack.Screen
          name="TgHomeScreen"
          component={TgHomeScreen}
          options={{ title: "TgHomeScreen" }}
        />

        <Stack.Screen
          name="Customtour"
          component={Customtour}
          options={{ title: "Customtour" }}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: "Notification" }}
        />

        <Stack.Screen
          name="TopToursScreen1"
          component={TopToursScreen1}
          options={{ title: "TopToursScreen1" }}
        />

        <Stack.Screen
          name="TopToursScreen2"
          component={TopToursScreen2}
          options={{ title: "TopToursScreen2" }}
        />
        <Stack.Screen
          name="DetailsScreen1"
          component={DetailsScreen1}
          options={{ title: "DetailsScreen1" }}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{ title: "Booking" }}
        />
        <Stack.Screen
          name="Purchasecredit"
          component={Purchasecredit}
          options={{ title: "Purchasecredit" }}
        />

        <Stack.Screen
          name="UserProfile4"
          component={UserProfile4}
          options={{ title: "UserProfile4" }}
        />

        <Stack.Screen
          name="Userprofile1"
          component={Userprofile1}
          options={{ title: "Userprofile1" }}
        />

        <Stack.Screen
          name="UserProfile5"
          component={UserProfile5}
          options={{ title: "UserProfile5" }}
        />

        <Stack.Screen
          name="UserProfile55"
          component={UserProfile55}
          options={{ title: "UserProfile55" }}
        />

        <Stack.Screen
          name="UserProfile66"
          component={UserProfile66}
          options={{ title: "UserProfile66" }}
        />
        <Stack.Screen
          name="TourguideBoard"
          component={TourguideBoard}
          options={{ title: "TourguideBoard" }}
        />

        <Stack.Screen
          name="TourguideBoard1"
          component={TourguideBoard1}
          options={{ title: "TourguideBoard1" }}
        />
        <Stack.Screen
          name="UserProfile8"
          component={UserProfile8}
          options={{ title: "UserProfile8" }}
        />

        <Stack.Screen
          name="UserProfile44"
          component={UserProfile44}
          options={{ title: "UserProfile44" }}
        />

        <Stack.Screen
          name="UserProfile45"
          component={UserProfile45}
          options={{ title: "UserProfile45" }}
        />

        <Stack.Screen
          name="VendorTransaction"
          component={VendorTransaction}
          options={{ title: "VendorTransaction" }}
        />

        <Stack.Screen
          name="VendorRefundrequests"
          component={VendorRefundrequests}
          options={{ title: "VendorRefundrequests" }}
        />

        <Stack.Screen
          name="VendorReservedTour"
          component={VendorReservedTour}
          options={{ title: "VendorReservedTour" }}
        />

        <Stack.Screen
          name="UserProfile7"
          component={UserProfile7}
          options={{ title: "UserProfile7" }}
        />
        <Stack.Screen name="TabNavigation1" component={TabNavigation1} />

        <Stack.Screen name="TabNavigation2" component={TabNavigation2} />

        <Stack.Screen
          name="CarHomeScreen"
          component={CarHomeScreen}
          options={{ title: "CarHomeScreen" }}
        />

        <Stack.Screen
          name="Quote"
          component={Quote}
          options={{ title: "Quote" }}
        />

        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ title: "Contact" }}
        />
        <Stack.Screen name="Map" component={Map} options={{ title: "Map" }} />
        <Stack.Screen
          name="About"
          component={About}
          options={{ title: "About" }}
        />
        {/* 

        {/* {/*
       
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ title: "CartScreen" }}
        />
     
        
        
        <Stack.Screen
          name="TourPlanner"
          component={TourPlanner}
          options={{ title: "TourPlanner" }}
        />
       
        
        
        {/* 
       
        {/* 
        */}
        {/* <Stack.Screen
          name="UserProfile11"
          component={UserProfile11}
          options={{ title: "UserProfile11" }}
        /> */}
        {/* <Stack.Screen
          name="UserProfile12"
          component={UserProfile12}
          options={{ title: "UserProfile12" }}
        /> */}
        {/* <Stack.Screen
          name="Shared"
          component={Shared}
          options={{ title: "Shared" }}
        />
        
        
        <Stack.Screen
          name="Review"
          component={Review}
          options={{ title: "Review" }}
        />
      
       
        
         */}
        {/*  */}
        {/* <Stack.Screen
          name="UserProfile6"
          component={UserProfile6}
          options={{ title: "UserProfile6" }}
        />
         */}
        {/* */}
        {/* */}
        {/* 
        <Stack.Screen
          name="TopToursScreen"
          component={TopToursScreen}
          options={{ title: "TopToursScreen" }}
        />
        
        <Stack.Screen
          name="TourguideFind"
          component={TourguideFind}
          options={{ title: "TourguideFind" }}
        />
        <Stack.Screen
          name="TourGuide"
          component={TourGuide}
          options={{ title: "TourGuide" }}
        />
        <Stack.Screen
          name="TourGuideDetails"
          component={TourGuideDetails}
          options={{ title: "TourGuideDetails" }}
        />
        <Stack.Screen
          name="Caronboardscreen"
          component={Caronboardscreen}
          options={{ title: "Caronboardscreen" }}
        />
        <Stack.Screen
          name="PassresetSuccess"
          component={PassresetSuccess}
          options={{ title: "PassresetSuccess" }}
        />
       
        <Stack.Screen
          name="CarDetailsScreen"
          component={CarDetailsScreen}
          options={{ title: "CarDetailsScreen" }}
        />
        <Stack.Screen
          name="BudgetEstimateBoard"
          component={BudgetEstimateBoard}
          options={{ title: "BudgetEstimateBoard" }}
        />
        <Stack.Screen
          name="BudgetEstimate"
          component={BudgetEstimate}
          options={{ title: "BudgetEstimate" }}
        />{" "}
        */}

        {/* <Stack.Screen
          name="CarHomeScreen2"
          component={CarHomeScreen2}
          options={{ title: "CarHomeScreen2" }}
        />

       


        
        <Stack.Screen
          name="LoginScreen1"
          component={LoginScreen1}
          options={{ title: "LoginScreen1" }}
        />



       
        
      
        
      

       

      
       
        <Stack.Screen
          name="TourPlannerBoard"
          component={TourPlannerBoard}
          options={{ title: "TourPlannerBoard" }}
        />
        
       
        <Stack.Screen
          name="TopTours"
          component={TopTours}
          options={{ title: "TopTours" }}
        />
       
        <Stack.Screen
          name="TopTours1"
          component={TopTours1}
          options={{ title: "TopTours1" }}
        />
        <Stack.Screen
          name="TopTours2"
          component={TopTours2}
          options={{ title: "TopTours2" }}
        />
        <Stack.Screen
          name="Category1"
          component={Category1}
          options={{ title: "Category1" }}
        />
        <Stack.Screen
          name="Category2"
          component={Category2}
          options={{ title: "Category2" }}
        />
       
        <Stack.Screen
          name="Category3"
          component={Category3}
          options={{ title: "Category3" }}
        />
        <Stack.Screen
          name="Tourplannedpage"
          component={Tourplannedpage}
          options={{ title: "Tourplannedpage" }}
        />
        <Stack.Screen
          name="Category4"
          component={Category4}
          options={{ title: "Category4" }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ title: "DetailsScreen" }}
        />
       
        <Stack.Screen
          name="CreateTour"
          component={CreateTour}
          options={{ title: "CreateTour" }}
        />
         */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
