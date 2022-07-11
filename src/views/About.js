import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { Paragraph,Card } from 'react-native-paper';



import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";

const About = ({ navigation }) => {



  
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/onboardImage11.png")}
      >
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.white,paddingTop: 45, fontSize: 40, fontWeight: "bold" }}>
          About us
        </Text>

        <Paragraph style={{ color: COLORS.white,  }}>Our project is an online platform that links tourists with tourism service providers. In this project our aim is to introduce Guides and tour companies to register their profiles here, delivering detailed information about themselves, their services, facilities, and experiences. Our project aim is also to provide a unique platform to tourists and tour planners, where tourists will see the details of tours posted by local, small- and large-scale tour planners. Tourists will be able to view and receive notifications about important details of the tours and packages offered by different tour planners through this application. Tour planners will create tours of their own choice and it will be available publicly to anyone who will use the app. A lot of local, small, and large tour planners are there for this purpose. Tourists will select from amongst hundreds of these guides and tourism providers, to find the one that is most appropriate for their requirements. 
</Paragraph>

<Text style={{ color: COLORS.white, fontSize: 40, fontWeight: "bold" }}>
Acknowledgement 
        </Text>

        <Paragraph style={{ color: COLORS.white,  }}>We have been working diligently hard on our project and we are very appreciative of the guidance, kind behavior, help from COMSATS University Lahore, and the continued supervision of Sir Abdul Karim Shahid. We thank Abdul Karim Shahid for choosing us for this project. He provided us with ongoing guidance, support, help, and welcoming behaviour. It is your grateful support and guidance, otherwise, it would have not been possible to start this project. 
</Paragraph>
<Text style={{ color: COLORS.white, fontSize: 30, fontWeight: "bold", marginBottom:10 }}>
Head of the project
        </Text>

        <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold",marginBottom:10 }}>
          Sir Abdul Karim Shahid
        </Text>
<Card>
    <Card.Cover source={require("../../assets/sir.jpg")} />
  </Card>

  <Text style={{ color: COLORS.white, fontSize: 40,marginTop:10, fontWeight: "bold" }}>
Team Members
        </Text>

        <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold",marginBottom:10 }}>
Syed Komail
Zain Haroon
Sayyam Ali        </Text>
        <Card>
    <Card.Cover source={require("../../assets/dp.jpg")} />
  </Card>

        <Text style={{ color: COLORS.black, fontSize: 20,  }}>
        
        </Text>

      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default About;
