import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Quote = () => {
  const [Quote, setQuote] = useState("Loading...");
  const [Author, setAuthor] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" + Quote;
    Linking.openURL(url);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          paddingBottom: 150,
          paddingTop: 50,
        }}
      >
        <StatusBar barStyle="light-content" />
        <View
          style={{
            width: "90%",
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: "600",
              color: "#333",
              marginBottom: 20,
            }}
          >
            Quote of the Day
          </Text>
          <FontAwesome5
            name="quote-left"
            style={{ fontSize: 20, marginBottom: -12 }}
            color="#000"
          />
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              lineHeight: 26,
              letterSpacing: 1.1,
              fontWeight: "400",
              textAlign: "center",
              marginBottom: 10,
              paddingHorizontal: 30,
            }}
          >
            {Quote}
          </Text>
          <FontAwesome5
            name="quote-right"
            style={{
              fontSize: 20,
              textAlign: "right",
              marginTop: -20,
              marginBottom: 20,
            }}
            color="#000"
          />
          <Text
            style={{
              textAlign: "right",
              fontWeight: "300",
              fontStyle: "italic",
              fontSize: 16,
              color: "#000",
            }}
          >
            —— {Author}
          </Text>
          <TouchableOpacity
            onPress={randomQuote}
            style={{
              //  backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
              backgroundColor: COLORS.primary,

              padding: 20,
              borderRadius: 30,
              marginVertical: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
              {isLoading ? "Loading..." : "New Quote"}
            </Text>
          </TouchableOpacity>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={tweetNow}
              style={{
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 50,
                padding: 15,
              }}
            >
              <FontAwesome name="twitter" size={22} color="COLORS.primary" />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 20,
                //marginTop: -200,
                paddingTop: 20,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-back-ios" size={20} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Go back</Text>
            </View>
          </TouchableOpacity> */}

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Quote;
