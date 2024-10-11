// InfoForm.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Fondo transparente
  },
  detailsContainer: {
    backgroundColor: "#FEFEFE",
    marginTop: 0, // Espacio en la parte superior
    marginBottom: 20, // Espacio en la parte inferior
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
    width: 328,
    // Sombra similar a la de EditPublication
   // shadowColor: "#000",
   // shadowOffset: {
   //   width: 0,
   //   height: 2,
   // },
   // shadowOpacity: 0.4,
   // shadowRadius: 4.2,
   // elevation: 5,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent', // Fondo transparente
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3a9347', // Verde cuando esté seleccionado
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a9347', // Color verde
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  mediaButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
