import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

import GlobalContextProvider from "./context/GlobalContext";
import Entry from "./Entry";
import { View } from "react-native";

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const handleArm = () => {
    setAlarm(true);
    setStatus(true);
  };

  const handleDisarm = () => {
    setAlarm(false);
    setStatus(false);
    Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
    <GlobalContextProvider>
      <View style={{ backgroundColor: "#282828", flex: 1 }}>
        <Entry />
      </View>
    </GlobalContextProvider>
  );
}
