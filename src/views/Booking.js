import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,TouchableOpacity,

} from 'react-native';




import COLORS from '../consts/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Looder';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store";
import axios from "axios";


const Booking = async ({route,navigation}) => {
  const [inputs, setInputs] = React.useState({
    fullname: '',
    
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [balance,setBalance]= useState();
  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");

    // console.log("called axios in user profile", getValueFor("token"));
    const axiosPosts = async () => {
      const response = await axios.get(
        "https://tourbook-backend.herokuapp.com/user/mydetails",
        { headers: { "x-auth-token": token } }
      );
      setBalance(response.data.data.balance);
      console.log(response.data.data);
    };
    axiosPosts();
  }, []);

   
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

  

    if (!inputs.fullname) {
      handleError('Please Fill the Field', 'fullname');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        // AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('HomeScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>

<Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Don't Have payment, purchase credit now
        </Text>

        
       

          <Button
          title="Purchase Credit"
          onPress={() => navigation.navigate("Purchasecredit")}
        />

<Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click Purchase Credit to buy the Credit
          </Text>

<Text style={{color: COLORS.white, fontSize: 25, fontWeight: 'bold'}}>
          Or
        </Text>

<Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Or
        </Text>
        <Text style={{color: COLORS.white, fontSize: 25, fontWeight: 'bold'}}>
          Or
        </Text>

        
      
   
        <View style={{marginVertical: 20}}>
          
          
           <View style={{flex:1, flexDirection: 'row', }}>
        

        
      </View>

      <Text style={{color: COLORS.black,fontWeight: 'bold',fontSize: 18, marginVertical: 10}}>
          Got credits then Pay now.
        </Text> 

      <Text style={{color: COLORS.black,fontWeight: 'bold',fontSize: 18, marginVertical: 10}}>
          You have to pay : 
        </Text> 


          <Button title="Pay Now" onPress={validate} />
          <Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click pay now to pay the payment
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  criteriaRow: {
    flexDirection: "row",
    padding: 25,
    alignItems: "center",
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    paddingLeft: 15,
    paddingBottom: 15,
    marginBottom: 15,
    paddingTop: 15,
  },
  icon: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
});



export default Booking;