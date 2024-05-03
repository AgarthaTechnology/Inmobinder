import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnMapContainerSave: {
    paddingRight: 5,
    width: "50%",
  },
  btnMapSave: {
    backgroundColor: "#008000",
  },
  btnMapContainerCancel: {
    paddingLeft: 5,
    width: "50%",
  },
  btnMapCancel: {
    backgroundColor: "#FF0000",
  },
});