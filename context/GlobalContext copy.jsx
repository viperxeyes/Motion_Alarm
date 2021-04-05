import React, { createContext, useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

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

  const checkJson = (data) => {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  };

  const connect = (ip) => {
    if (wsclient == null) {
      var client = new WebSocket(`ws://${ip}/ws`);

      client.onopen = () => {
        setConnected(true);
        clearTimeout(interval);
      };

      client.onmessage = (message) => {
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

      client.onclose = () => {
        setConnected(false);
        console.log("Client has CLOSED");
        setClient(null);
      };
      client.onerror = () => {
        console.log("ERROR");
        setClient(null);
        let int = setTimeout(() => {
          connect(settings.ip);
        }, 5000);
        setIntervall(int);
      };

      setClient(client);
    } else {
      setClient(null);
    }
  };

  const saveSettings = async (value) => {
    if (wsclient != null) {
      wsclient.close();
      setClient(null);
    }
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("settings", jsonValue).then(() => {
        setSettings(value);
        connect(value.ip);
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
    if (wsclient !== null) {
      wsclient.onmessage = (message) => {
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
    }
  }, [connected, alarm]);
  if (Object.keys(settings).length != 0 && wsclient == null) {
    connect(settings.ip);
  }

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
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
