import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import sensorApi from "./sensorApi";

export default function App() {
  const [status, setStatus] = useState(false);
  const [sensorState, setSensorState] = useState();
  const [alarm, SetAlarm] = useState(false);

  const [sent, setSent] = useState(false);
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  if (connected === false) {
    var ws = new WebSocket("ws://192.168.1.5/ws");
    ws.onopen = () => {
      // connection opened
      ws.send("something"); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);

      setData(e.data);
      console.log("status is :", data);
      if (e.data === 1) {
        alert("on");
      } else {
        alert("off");
      }
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
      ws.close();
      setConnected(false);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
      setConnected(false);
    };
    setConnected(true);
  }

  function handlePress() {
    if (sent === false) {
      setSent(true);
      console.log("NOTIFICATION:", sent);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Look at that notificationa",
          body: "I'm so proud of myself!",
        },
        trigger: null,
      });
    }
  }

  const handleDisarm = () => {
    setStatus(false);
    setSent(false);
    clearInterval(intervalID);

    // Second, call the method
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {alarm === false ? "INACTIVE" : "ACTIVE"}
      </Text>
      {status === false ? (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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

      <StatusBar style="auto" />
      <Text>System is {status === false ? "DISARMED" : "ARMED"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  label: {
    fontSize: 80,
    color: "gray",
  },
});
