import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalStyles } from "../Styles/GlobalStyles";

export default function Settings() {
  const context = useContext(GlobalContext);
  const { saveSettings, settings, setSettings } = context;
  const [ip, setIp] = useState(settings.ip);

  const handleIpInput = (e) => {
    setIp(e);
  };
  const handleSave = async () => {
    let settings = {};

    settings.ip = ip;
    await saveSettings(settings).then(setSettings(settings));
    Keyboard.dismiss();
  };
  return (
    <View style={GlobalStyles.centerContainer}>
      <Text style={GlobalStyles.ipLabel}>IP Address</Text>
      <TextInput
        style={GlobalStyles.ipTextInput}
        placeholder="Enter IP Address"
        placeholderTextColor="gray"
        onChangeText={(e) => {
          handleIpInput(e);
        }}
        value={ip}
      ></TextInput>
      <View
        style={{
          alignItems: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={GlobalStyles.button} onPress={handleSave}>
          <Text style={GlobalStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
