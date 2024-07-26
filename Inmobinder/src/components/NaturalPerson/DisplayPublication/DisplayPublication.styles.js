import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  publication: {
    backgroundColor: "#FEFEFE",
    marginTop: 100,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    width: 328,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.2,
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  gallery: {
    resizeMode: "center",
    height: 200,
    width: 328,
    borderRadius: 10,
  },
});
