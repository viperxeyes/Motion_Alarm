import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
export default function Splash() {
  const [loaded] = useFonts({
    ChangaBold: require("../assets/fonts/Changa-Bold.ttf"),
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Images/logo.png")}
        style={styles.image}
      />
      {loaded ? <Text style={styles.text}>SEU Advanced Systems</Text> : null}

      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="rgba(207, 21, 14, 0.651)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "40%",
    alignItems: "center",
    backgroundColor: "rgba(36, 39, 54, 0.98)",
  },
  text: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "ChangaBold",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: "10%",
  },
  indicator: {
    marginTop: "5%",
  },
});
