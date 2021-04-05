import React from "react";
import Home from "../components/Home";
import Settings from "../components/Settings";

export const HomeScreen = ({ navigation, route }) => {
  return <Home navigation={navigation} route={route} />;
};

export const SettingsScreen = ({ navigation, route }) => {
  return <Settings navigation={navigation} route={route} />;
};
