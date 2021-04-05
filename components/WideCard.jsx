import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalStyles } from "../Styles/GlobalStyles";

export default function WideCard({ image, disabled = false, text, humidity }) {
  return (
    <TouchableOpacity style={GlobalStyles.wideCard} disabled={disabled}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={image} style={{ width: 100, height: 100 }} />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={GlobalStyles.buttonText}>{text} </Text>
        {humidity ? (
          <Text style={GlobalStyles.buttonText}>{humidity} </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
