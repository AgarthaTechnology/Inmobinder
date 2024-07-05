import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 8,
  },
  pickerContainer: {
    width: "45%",
    marginHorizontal: "auto",
    marginTop: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: "100%",
  },
  input: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  error: {
    textAlign: "center",
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  descriptionInput: {
    backgroundColor: "#fff",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  mapIcon: {
    color: "#c2c2c2",
  },
  containerImage: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  icon: {
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#e3e3e3",
    width: 70,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
