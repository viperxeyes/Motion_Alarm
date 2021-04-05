import React, { createContext, useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import WS from "react-native-websocket";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [wsclient, setClient] = useState(null);
  const [settings, setSettings] = useState({});
  const [connected, setConnected] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({ temp: {}, motion: {} });
  const [loading, setLoading] = useState(true);
  const [interval, setIntervall] = useState(null);
  let wsRef = useRef();

  const checkJson = (data) => {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  };

  const saveSettings = async (value) => {
    setConnected(false);
    wsRef.current.state.ws.close();
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("settings", jsonValue).then(() => {
        setSettings(value);
      });
    } catch (e) {
      // saving error
    }
  };

  const handleArm = () => {
    setAlarm(true);
    setStatus(true);
  };

  const handleDisarm = () => {
    setAlarm(false);
    setStatus(false);
    Notifications.cancelAllScheduledNotificationsAsync();
  };

  const loadSettings = async () => {
    try {
      const value = await AsyncStorage.getItem("settings");
      if (value !== null) {
        const settings = JSON.parse(value);
        setSettings(settings);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    loadSettings();
  }, [connected, alarm]);
  const onOpen = () => {
    setConnected(true);
  };

  const onClose = () => {
    console.log("Client Closed");
    setConnected(false);
  };
  const onError = () => {
    console.log("Error");
  };
  const onMessage = (message) => {
    if (checkJson(message.data)) {
      const json = JSON.parse(message.data);

      if (json.sensor == "dht") {
        setData((ps) => ({ ...ps, temp: json }));
      }
      if (json.sensor == "motion") {
        setData((ps) => ({ ...ps, motion: json }));

        console.log("State:", json.state);
        console.log("Alarm", alarm);
        if (json.state && alarm) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "ALARM",
              body: "Motion has been detected by the sensor",
            },
            trigger: {
              seconds: 5,
              repeats: true,
            },
          });
        }
      }
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        connected,
        setConnected,
        saveSettings,
        setSettings,
        settings,
        data,
        alarm,
        setAlarm,
        handleArm,
        handleDisarm,
        status,
        wsclient,
      }}
    >
      <WS
        ref={wsRef}
        url={`ws://${settings.ip}/ws`}
        onOpen={onOpen}
        onMessage={(e) => onMessage(e)}
        onClose={onClose}
        onError={onError}
        reconnect
      ></WS>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
