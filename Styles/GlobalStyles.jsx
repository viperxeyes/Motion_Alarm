import { Dimensions, StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "rgba(36, 39, 54, 0.91)",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,

    backgroundColor: "rgba(36, 39, 54, 0.98)",
    alignItems: "center",
    justifyContent: "center",
  },
  ipLabel: {
    color: "#fff",
    fontFamily: "ChangaBold",
    fontSize: 30,
  },
  ipTextInput: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
    width: "50%",
    color: "snow",
    fontSize: 23,
    fontFamily: "ChangaBold",
  },
  button: {
    backgroundColor: "red",
    margin: "3%",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "snow",
    fontSize: 25,
    fontFamily: "ChangaBold",
  },

  card: {
    width: Dimensions.get("screen").width / 2.2,

    backgroundColor: "rgba(36, 39, 54, 0.98)",
    margin: 5,
    alignItems: "center",
    padding: "5%",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 10,
  },

  wideCard: {
    width: Dimensions.get("screen").width / 1.05,

    backgroundColor: "rgba(36, 39, 54, 0.98)",
    flexDirection: "row",
    margin: "2%",
    alignItems: "center",
    padding: "5%",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 10,
  },
});
