import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';


import COLORS from '../consts/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Looder';

const CreateTour = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

   
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
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
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
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
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          CreateTour
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text> */}
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            //iconName="email-outline"
            label="Destination"
            placeholder="Enter Destination"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            //iconName="account-outline"
            label="Stay"
            placeholder="Enter your stay time"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            label="Date"
            placeholder="Select Date"
            error={errors.phone}
          />
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
      
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            //iconName="email-outline"
            label="Passenger"
            placeholder="Enter Number of Passenger"
            error={errors.email}
          />

            <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            //iconName="email-outline"
            label="Vehicle Type"
            placeholder="Vehicle Type"
            error={errors.email}
          />

            <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            //iconName="email-outline"
            label="Further Information"
            placeholder="Further Information"
            error={errors.email}
          />  

          <Button title="Create" onPress={validate} />
          <Text
            style={{
              color: COLORS.grey,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 12,
            }}>
            Click create to get the tour created and visible to Public
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTour;