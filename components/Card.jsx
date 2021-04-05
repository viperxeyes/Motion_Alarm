import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalStyles } from "../Styles/GlobalStyles";

export default function Card({ image, disabled = false, text, onPress }) {
  return (
    <TouchableOpacity
      style={GlobalStyles.card}
      disabled={disabled}
      onPress={onPress}
    >
      <Image source={image} style={{ width: 100, height: 100 }} />
      <Text style={GlobalStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
