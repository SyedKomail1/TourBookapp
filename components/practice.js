import * as React from 'react';
import { Text, View, Image } from "react-native";


export default class RootComponent extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View>
            <Image
              
              style={{
                height: 135,
                width: 155
              }}
            />
          </View>
          <View style={{ padding: 10, width: 155 }}>
            <Text>Title</Text>
            <Text style={{ color: "#777", paddingTop: 5 }}>
              Description of the image
            </Text>
          </View>
        </View>
      </View>
    );
  }
}