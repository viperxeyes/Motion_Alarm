import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./components/Splash";
import { HomeScreen, SettingsScreen } from "./Screens/Screens";
import { GlobalContext } from "./context/GlobalContext";
import Home from "./components/Home";

import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

const scr = () => {
  return <Home />;
};

export default function Entry() {
  const context = useContext(GlobalContext);
  const { loading, setLoading } = context;

  useEffect(() => {
    console.log("Effect", loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "rgba(36, 39, 54, 1)" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Settings");
                  }}
                >
                  <AntDesign name="setting" size={32} color="red" />
                </TouchableOpacity>
              );
            },
          })}
        />

        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#3c3f41",
    alignItems: "center",
  },
  button: {
    width: "70%",
    flexDirection: "row",
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 30,
    color: "white",
  },
  header: {
    marginTop: "20%",
    fontSize: 30,
    color: "black",
  },
  label: {
    fontSize: 80,
    color: "gray",
  },
});
