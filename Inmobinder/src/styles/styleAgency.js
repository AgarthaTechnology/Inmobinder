import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover', // Para que la imagen cubra toda la pantalla
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black', // Color del texto en el fondo
    },
    subtitle: {
      fontSize: 18,
      color: 'blue',
      marginBottom: 10,
      color: 'white', // Color del texto en el fondo
    },
    text: {
      fontSize: 16,
      marginBottom: 20,
      color: 'white', // Color del texto en el fondo
    },
    button: {
      flexDirection: 'row', // Alinea el ícono y el texto horizontalmente
      backgroundColor: 'lightblue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 10, // Espacio entre el ícono y el texto
    },
    question: {
      fontSize: 16,
      marginBottom: 10,
      color: 'white', // Color del texto en el fondo
    },
    iconButton: {
      flexDirection: 'row', // Alinea el ícono y el texto horizontalmente
      backgroundColor: 'lightgray',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    icon: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 10, // Espacio entre el ícono y el texto
    },

    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    agencyContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    agencyImage: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 5,
    },
    agencyTextContainer: {
      flex: 1,
    },
    agencyName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    detailsButton: {
      backgroundColor: 'green',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    detailsButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    textSpacing: {
      marginBottom: 45, // Puedes ajustar este valor según tu preferencia
    },
  });
  

  