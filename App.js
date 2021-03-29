import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import sensorApi from "./sensorApi";
var client = new WebSocket("ws://192.168.1.11/ws");
export default function App() {
  const [connected, setConnected] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState("");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    client.onopen = () => {
      setConnected(true);
    };

    client.onmessage = (message) => {
      console.log(message.data);
      console.log("ALRAM", alarm);
      setData(message.data);
      if (message.data == 1 && alarm) {
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
    };

    client.onclose = () => {
      setConnected(false);
    };
  }, [alarm]);

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
    <View style={styles.container}>
      <Text style={styles.header}>
        Status :{connected ? "Conncted" : "Disconnected"}
      </Text>
      <Text style={styles.label}>
        {alarm === false ? "INACTIVE" : "ACTIVE"}
      </Text>

      {status === false ? (
        <TouchableOpacity style={styles.button} onPress={handleArm}>
          <View>
            <Text style={styles.text}>ARM</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleDisarm}>
          <View>
            <Text style={styles.text}>DISARM</Text>
          </View>
        </TouchableOpacity>
      )}

      <Text>System is {status === false ? "DISARMED" : "ARMED"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
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
