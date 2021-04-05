import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalStyles } from "../Styles/GlobalStyles";
import Images from "../Styles/Images";
import Card from "./Card";
import WideCard from "./WideCard";
export default function Home({ navigation }) {
  const context = useContext(GlobalContext);
  const {
    connected,

    data,
    status,
    handleArm,
    handleDisarm,
    setAlarm,
  } = context;

  useEffect(() => {}, []);
  return (
    <View style={GlobalStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          backgroundColor: "rgba(36, 39, 54, 0.658)",
          margin: 5,
          width: "95%",
        }}
      >
        <Text style={GlobalStyles.buttonText}>Status</Text>
        <Image
          source={connected ? Images.online : Images.offline}
          style={{ width: 32, height: 32 }}
          style={{ marginLeft: 10 }}
        />
      </View>

      {!connected ? <ActivityIndicator size="large" color="red" /> : null}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Card
          image={data.motion.state ? Images.motionOn : Images.motionOff}
          disabled={true}
          text={data.motion.state ? "Active" : "Inactive"}
        />

        {status ? (
          <Card
            image={Images.locked}
            text="Armed"
            onPress={() => {
              handleDisarm();
              setAlarm(false);
            }}
          />
        ) : (
          <Card image={Images.unlocked} text="Disarmed" onPress={handleArm} />
        )}
      </View>

      <WideCard
        image={
          data.temp.temp >= 0 && data.temp.temp <= 13
            ? Images.tempFreezing
            : data.temp.temp > 13 && data.temp.temp <= 21
            ? Images.tempCool
            : data.temp.temp > 21 && data.temp.temp <= 29
            ? Images.tempWarm
            : data.temp.temp > 29 && data.temp.temp <= 37
            ? Images.tempHot
            : Images.tempBlazing
        }
        disabled={true}
        text={data.temp.temp + " °C"}
      />
      <WideCard
        image={Images.humidity}
        disabled={true}
        text={data.temp.humidity + " %"}
        humidity={data.temp.comfort}
      />
    </View>
  );
}
