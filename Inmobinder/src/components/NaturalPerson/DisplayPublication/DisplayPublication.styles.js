import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  publication: {
    backgroundColor: "#FEFEFE",
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
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
  gallery: {
    resizeMode: "cover",
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  nameProperty: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Añadir margen inferior para espacio vertical
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  detailsText: {
    fontSize: 14,
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  goButton: {
    backgroundColor: "#3a9347",
    width: 45,
    height: 45,
    flex: 2.5,
    borderRadius: 25, // Ajuste para bordes más redondeados
    marginRight: 10,
  },
  editButton: {
    backgroundColor: "#3a9347",
    width: 45,
    height: 45,
    borderRadius: 45 / 2, // Totalmente redondeado
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#a02437",
    width: 45,
    height: 45,
    borderRadius: 45 / 2, // Totalmente redondeado
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { // botón de ir a la public
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noImageText: {
    alignSelf: "center",
    fontSize: 14,
    color: "#999",
  },
  iconWrapper: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});