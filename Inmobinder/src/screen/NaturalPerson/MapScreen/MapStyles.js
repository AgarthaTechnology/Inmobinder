import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 638,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    elevation: 3, // Para Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  filterButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#009245",
    padding: 10,
    borderRadius: 50,
    elevation: 3, // Para Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  filterMenu: {
    position: "absolute",
    top: 110,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  filterMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  filterMenuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  legend: {
    position: "absolute",
    bottom: 15,
    right: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    alignItems: "center",
    width: 190,
    height: 45,
  },
  legendText: {
    marginLeft: 10,
    fontSize: 12,
  },
  container: {
    position: "absolute",
    top: 21,
    left: 1,
    right: 100,
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: "80%",
    maxWidth: 300,
    height: "auto",
  },
  image: {
    width: 100,
    height: 100,
    top: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  menu: {
    position: "absolute",
    top: 60,
    left: 10,
    width: 200, // Ancho del menú
    backgroundColor: "white",
    borderRightWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5, // Sombra
    paddingBottom: 300, // Espacio abajo
  },
  searchContainers: {
    position: "absolute",
    top: 150, // Adjust this value based on the image height and margin
    left: 10,
    right: 10,
    borderRadius: 20,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  inputSearch: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row", // Alinear elementos horizontalmente
    justifyContent: "space-between", // Espaciar los elementos de manera uniforme
    paddingHorizontal: 20, // Añadir relleno horizontal para separar los botones de los bordes laterales
    marginTop: 10, // Ajustar según la posición deseada
  },
  applyButton: {
    backgroundColor: "green", // Color de fondo del botón "Aplicar filtros"
    paddingVertical: 10, // Ajustar según el tamaño deseado del botón
    paddingHorizontal: 20, // Ajustar según el tamaño deseado del botón
    borderRadius: 5, // Bordes redondeados del botón
  },
  clearButton: {
    backgroundColor: "red", // Color de fondo del botón "Limpiar filtros"
    paddingVertical: 10, // Ajustar según el tamaño deseado del botón
    paddingHorizontal: 20, // Ajustar según el tamaño deseado del botón
    borderRadius: 5, // Bordes redondeados del botón
  },
  buttonText: {
    color: "white", // Color del texto de los botones
    fontSize: 16, // Tamaño del texto de los botones
    textAlign: "center", // Alinear el texto al centro dentro del botón
  },
  buscar: {
    flexDirection: "row",
    alignItems: "center",
    width: 290,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.4)", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    position: "absolute",
    top: 20, // Ajusta según sea necesario para la posición
  },
  icon: {
    right: 20,
    marginTop: 1,
  },
  menuButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#D7DBDD",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  menuItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },
});
