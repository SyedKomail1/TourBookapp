import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Fontisto } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeChipInput from "react-native-chip-input";
import RemovableChips from "react-native-chip/RemovableChips";
import { Snackbar, Button } from "react-native-paper";
import ReactChipsInput from "react-native-chips";

import COLORS from "../consts/colors";
import Button1 from "../../components/Button1";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Tags from "react-native-tags";

const Customtour = ({ navigation }) => {
  const [cities, setCities] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [mode1, setMode1] = useState("date");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [text, setText] = useState("Empty");
  const [Iserror, setIsError] = React.useState(false);

  const [error, setError] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const [starttext, setStartText] = useState("");
  const [endtext, setEndText] = useState("");
  const [places, setPlaces] = useState("");

  const [description, setDescription] = React.useState("");
  const [maxBudget, setMaxBudget] = React.useState();
  const [seats, setSeats] = React.useState();
  const [scity, setSCity] = React.useState({
    _id: "",
    name: "Select the Source Destination",
  });
  const [desCity, setDesCity] = React.useState({
    _id: "",
    name: "Select the destination",
  });
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setStartDate(selectedDate);
    // Process the date values
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();
    //setText(fDate);
    setStartText(fDate);
    // Log the Time & Date values
    console.log(fTime);
    console.log(tempDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === "ios");
    setDate(currentDate);
    setEndDate(selectedDate);
    // Process the date values
    let tempDate1 = new Date(currentDate);
    let fDate1 =
      tempDate1.getDate() +
      "/" +
      (tempDate1.getMonth() + 1) +
      "/" +
      tempDate1.getFullYear();
    let fTime =
      "Hours: " +
      tempDate1.getHours() +
      " | Minutes: " +
      tempDate1.getMinutes();
    //setText(fDate);
    setEndText(fDate1);
    // Log the Time & Date values
    console.log(fTime);
    console.log(tempDate1);
  };

  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };

  // inputs.city = "626e2a64c65f4c055b64364d";

  const getCities = async () => {
    await axios
      .get("http://tourbook-backend.herokuapp.com/api/city/all")
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCities();
  }, []);

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    console.log("MaxBudget", maxBudget, "seats", seats);

    if (!maxBudget) {
      handleError("Please input maxBudget", "maxBudget");
      console.log("maxBudget wale me error hai");
      isValid = false;
    }

    if (maxBudget >= 50000) {
      handleError("MaxBudget should be less than 50000", "maxBudget");

      isValid = false;
    }

    if (!description) {
      handleError("Please input lastname", "description");
      console.log("description wale me error hai");
      isValid = false;
    }

    // if (!inputs.city) {
    //   handleError("Please input source", "city");
    //   console.log("city wale me error hai");
    //   isValid = false;
    // }

    // if (!inputs.cityy) {
    //   handleError("Please input destination", "cityy");
    //   console.log("cityy wale me error hai");
    //   isValid = false;
    // }

    if (!seats) {
      handleError("Please input seats", "seats");
      console.log("seats err2");
      isValid = false;
    }

    if (seats >= 50) {
      handleError("Seats should be less than 50", "seats");

      isValid = false;
    }

    console.log("\n called axios1\n");
    console.log(isValid);

    if (isValid) {
      console.log("\n called axios2\n");

      addData();
    }
  };

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  const addData = async (e) => {
    console.log("\n called axios\n");

    console.log(
      checked,
      checked1,
      maxBudget,
      description,
      seats,
      scity._id,
      desCity._id,
      startDate,
      endDate,
      places
    );

    const token = await getValueFor("token").then((token) => {
      axios
        .post(
          "http://tourbook-backend.herokuapp.com/api/customtours/create",
          {
            requirements: {
              maxBudget: maxBudget,
              seats: seats,
              description: description,
              source: scity._id,
              destination: desCity._id,
              isHotel: checked,
              isGuide: checked1,
              startDate: startDate,
              endDate: endDate,
              places: places,
            },
          },
          { headers: { "x-auth-token": token } }
        )
        .then((response) => {
          console.log(response.data);

          navigation.navigate("Success");
        })
        .catch((err) => {
          setLoading(false);
          console.log("catch error error");

          console.error(err);
          console.log(err.response.data.message);
          setError(err.response.data.message);

          setIsError(true);
        });
    });
  };

  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />

        <StatusBar backgroundColor="#009387" barStyle="light-content" />

        <View style={style.header6}>
          <View style={style.upView}>
            <Image
              style={{ resizeMode: "contain", height: "250%", marginTop: 20 }}
              source={require("../../assets/travel1-01.png")}
            />
          </View>
        </View>

        <View style={style.footer}>
          <Text
            style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}
          >
            Custom Tour
          </Text>
          <Text
            style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}
          >
            Enter Your Details to create custom tour
          </Text>

          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => setMaxBudget(text)}
              onFocus={() => handleError(null, "maxBudget")}
              //Name="account-outline"
              label="Maximum Budget"
              placeholder="Enter your Maximum Budget"
              error={errors.maxBudget}
            />

            <Input
              keyboardType="numeric"
              minLength={2}
              maxLength={2}
              onChangeText={(text) => setSeats(text)}
              onFocus={() => handleError(null, "seats")}
              //Name="phone-outline"
              label="Seats"
              placeholder="Enter your seats"
              error={errors.seats}
            />

            {/* <RemovableChips      
 label="Enter item"  onChangeChips={(chips) => console.log(chips)} alertRequired={true}
 chipStyle={{ borderColor: 'blue', backgroundColor: 'grey' }} 
  
/> */}

            {/* //3 items, change text */}

            {/* < ReactChipsInput 
    label="Enter Fruits" 
    onChangeChips={(chips) => setPlaces(chips)} 
   
    chipStyle={{ borderColor: 'blue', backgroundColor: 'grey' }} 
    inputStyle={{fontSize: 22}} 
    labelStyle={{ color: 'blue'}} 
    labelOnBlur={{ color: '#666' }} /> */}

            {/* <RemovableChips            
     chipStyle={{ borderColor: '#00B761', backgroundColor: 'white' }} 

 label="Enter item"  onChangeChips={(chips) => setPlaces(chips)} alertRequired={true}/>  */}

            {/* 
   <ReactNativeChipInput
            inputVarint="outlined"
            showChipIcon={false}
            chipIconAction={(chips) => setPlaces(chips)}
            label="places"
            placeholder="email"
            primaryColor="#1976d2"
            secondaryColor="#ffffff"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
          />    */}

            <Input
              onChangeText={(text) => setDescription(text)}
              onFocus={() => handleError(null, "description")}
              Name="account-outline"
              label="Description"
              placeholder="Enter your description"
              error={errors.description}
            />

            <Text
              style={{
                color: COLORS.primary,
                textAlign: "left",
                fontSize: 16,
                paddingBottom: 5,
              }}
            >
              Start Date
            </Text>

            <View>
              <View style={{ margin: 20 }}>
                {/* <Text>{starttext}</Text> */}
                <Input label="Select Date" value={starttext}></Input>
                <Fontisto
                  name="date"
                  size={28}
                  color={COLORS.primary}
                  onPress={() => showMode("date")}
                />
              </View>

              <Text
                style={{
                  color: COLORS.primary,
                  textAlign: "left",
                  fontSize: 16,
                  paddingBottom: 5,
                }}
              >
                End Date
              </Text>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode1}
                  is24Hour={true}
                  display="default"
                  onChange={onStartDateChange}
                />
              )}
            </View>

            <View>
              <View style={{ margin: 20 }}>
                {/* <Text>{endtext}</Text> */}
                <Input label="Select Date" value={endtext}></Input>
                <Fontisto
                  name="date"
                  size={28}
                  color={COLORS.primary}
                  onPress={() => showMode1("date")}
                />
              </View>

              {show1 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onEndDateChange}
                />
              )}
            </View>

            <Text
              style={{
                color: COLORS.primary,
                textAlign: "left",
                fontSize: 16,
                paddingBottom: 5,
              }}
            >
              Source City
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginLeft: 7,
                  paddingTop: 3,
                  height: 60,
                  borderBottom: "1px solid",
                }}
              >
                <Picker
                  label="hello"
                  onValueChange={(itemValue) => {
                    // console.log(itemValue);
                    setSCity(itemValue);
                    console.log(scity);
                  }}
                >
                  <Input
                    label={scity?.name}
                    placeholder="Enter the Source City"
                  />

                  {cities ? (
                    cities.map((city) => (
                      <Picker.Item label={city.name} value={city} />
                    ))
                  ) : (
                    <></>
                  )}
                </Picker>
              </View>
            </View>

            <Text
              style={{
                color: COLORS.primary,
                textAlign: "left",
                fontSize: 16,
                paddingBottom: 5,
              }}
            >
              Destination
            </Text>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginLeft: 7,
                  paddingTop: 3,
                  height: 60,
                  borderBottom: "1px solid",
                }}
              >
                <Picker
                  label="hello"
                  onValueChange={(itemValue) => {
                    // console.log(itemValue);
                    setDesCity(itemValue);
                    console.log(desCity);
                  }}
                >
                  <Input
                    label={desCity?.name}
                    placeholder="Enter the Destination City"
                  />

                  {cities ? (
                    cities.map((city) => (
                      <Picker.Item label={city.name} value={city} />
                    ))
                  ) : (
                    <></>
                  )}
                </Picker>
              </View>
            </View>
            <View>
              <Checkbox.Item
                style={{ color: COLORS.primary }}
                label="Hotel"
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Checkbox.Item
                style={{ color: COLORS.primary }}
                label="Guide"
                status={checked1 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked1(!checked1);
                }}
              />
            </View>

            <Text
              style={{
                color: COLORS.primary,
                textAlign: "left",
                fontSize: 16,
                paddingBottom: 5,
              }}
            >
              Places
            </Text>

            <Tags
              initialText="text"
              initialTags={["Gilgat", "Manshera", "Swaat"]}
              onChangeTags={(tags) => setPlaces(tags)}
              onTagPress={(index, tagLabel, event) =>
                console.log(index, tagLabel, event)
              }
              inputStyle={{ backgroundColor: "white" }}
            />

            <Button1 title="Create" onPress={validate} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="arrow-back-ios" size={20} />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Go back
                </Text>
              </View>
            </TouchableOpacity>

            {Iserror ? (
              <View
                style={{
                  marginLeft: 85,
                  width: 200,
                  height: 100,
                  marginBottom: -30,
                  marginTop: 10,
                }}
              >
                <Button
                  mode="contained"
                  labelStyle={{ fontSize: 15 }}
                  color="firebrick"
                  onPress={onToggleSnackBar}
                >
                  {visible ? "Hide" : "Check Error"}
                </Button>
              </View>
            ) : (
              <></>
            )}
            {Iserror ? (
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: "Undo",
                  onPress: () => {
                    // Do something
                  },
                }}
              >
                Error:{error}
              </Snackbar>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header6: {
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },

  header1: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: COLORS.primary,
  },

  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 20,
    fontFamily: "Cochin",
    //
  },
  textPart2: {
    color: COLORS.grey,
    fontFamily: "Cochin",
    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  inputContainer: {
    height: 60,
    width: 400,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    margin: 5,
  },
  categoryContainer: {
    marginTop: 60,
    alignItems: "center",

    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    marginRight: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#00B761",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: COLORS.white,
  },

  footer: {
    marginTop: -220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    paddingHorizontal: 20,
    elevation: 30,

    //paddingHorizontal: 30
  },
  upView: {
    flex: 2,
    width: "100%",
    marginBottom: 230,
    //backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Customtour;
