import { StyleSheet, Dimensions } from "react-native";

const widthScreen = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
    alignSelf: "center",
  },
  mainImage: {
    height: 250,
    width: widthScreen,
  },
  modalContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
